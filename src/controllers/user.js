import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import validator from 'email-validator'

export const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body)

  try {
    const existingUser = await User.findByEmail(userToCreate.email)

    if (existingUser) {
      return sendDataResponse(res, 400, { email: 'Email already in use' })
    }
    if (!validator.validate(userToCreate.email)) {
      return sendDataResponse(res, 400, { email: 'invalid email address' })
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
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.bio &&
    req.body.githubUrl
  ) {
    req.user.firstName = req.body.firstName
    req.user.lastName = req.body.lastName
    req.user.bio = req.body.bio
    req.user.githubUrl = req.body.githubUrl
    const updatedUser = await req.user.update()
    return sendDataResponse(res, 201, updatedUser)
  }
  return sendMessageResponse(res, 400, 'Please update all details')
}
