import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import dbClient from '../utils/dbClient.js'

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
  const { cohort_id: cohortId } = req.body

  if (!cohortId) {
    return sendDataResponse(res, 400, { cohort_id: 'Cohort ID is required' })
  }

  return sendDataResponse(res, 201, { user: { cohort_id: cohortId } })
}

// NEW //
export const updateProfile = async (req, res) => {
  const newUserProfile = await User.fromJson(req.body)
  const userToUpdateId = Number(req.params.id)

  try {
    const existingUser = await User.findById(userToUpdateId)
    console.log('do you exist?', existingUser)

    if (!existingUser) {
      return sendDataResponse(res, 400, { message: 'User does not exist' })
    }

    const updatedProfile = await dbClient.profile.update({
      where: {
        id: userToUpdateId
      },
      data: {
        firstName: newUserProfile.firstName,
        lastName: newUserProfile.lastName,
        bio: newUserProfile.bio,
        githubUrl: newUserProfile.githubUrl
      }
    })
    console.log('update user: ', updatedProfile)

    return res.json({ data: updatedProfile })
  } catch (error) {
    return sendMessageResponse(res, 500, 'Unable to update new user')
  }
}
