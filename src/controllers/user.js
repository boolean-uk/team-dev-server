import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body)

  try {
    const existingUser = await User.findByEmail(userToCreate.email)

    if (existingUser) {
      return sendDataResponse(res, 400, { email: 'Email already in use' })
    }

    const createdUser = await userToCreate.save()

    return sendDataResponse(res, 201, createdUser)
  } catch (error) {
    return sendMessageResponse(res, 500, 'Unable to create new user')
  }
}

export const getById = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const foundUser = await User.findById(id)

    if (!foundUser) {
      return sendDataResponse(res, 404, { id: 'User not found' })
    }

    return sendDataResponse(res, 200, foundUser)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get user')
  }
}

export const getAll = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { first_name: firstName } = req.query

  let foundUsers

  if (firstName) {
    foundUsers = await User.findManyByFirstName(firstName)
  } else {
    foundUsers = await User.findAll()
  }

  const formattedUsers = foundUsers.map((user) => {
    return {
      ...user.toJSON().user
    }
  })

  return sendDataResponse(res, 200, { users: formattedUsers })
}

export const updateById = async (req, res) => {
  console.log(req.body)
  const id = parseInt(req.params.id)

  const userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    githubUrl: req.body.githubUrl
  }

  // check if req.body exists
  // if req.body exists we need to check which values we are updating

  const user = await prisma.profile.update({
    where: { userId: id },
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      githubUrl: req.body.githubUrl
    },
  })
  console.log('this is where we are: ', user)

  // if (!cohortId) {
  //   return sendDataResponse(res, 400, { cohort_id: 'Cohort ID is required' })
  // }

  // return sendDataResponse(res, 201, { user: { cohort_id: cohortId } })
}
