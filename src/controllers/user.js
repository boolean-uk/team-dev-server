import User from '../domain/user.js'

import jwt from 'jsonwebtoken'

import { JWT_EXPIRY, JWT_SECRET } from '../utils/config'

import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body)

  try {
    const existingUser = await User.findByEmail(userToCreate.email)

    if (existingUser) {
      return sendDataResponse(res, 400, { email: 'Email already in use' })
    }

    const createdUser = await userToCreate.save()

    const token = generateJwt(createdUser.id)

    return sendDataResponse(res, 200, { token, ...createdUser.toJSON() })
  } catch (error) {
    console.error('something went wrong', error.message)
    return sendMessageResponse(res, 500, 'Unable to create new user')
  }
}

function generateJwt(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
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
  const { first_name: firstName, cohort: inCohort } = req.query

  const whereData = {}
  if (inCohort === 'false') {
    whereData.cohort = null
  }

  let foundUsers

  if (firstName) {
    foundUsers = await User.findManyByFirstName(firstName)
  } else {
    foundUsers = await User.findAll({ whereData })
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
  newUserProfile.id = userToUpdateId

  try {
    const existingUser = await User.findById(userToUpdateId)

    if (!existingUser) {
      return sendDataResponse(res, 400, { message: 'User does not exist' })
    }

    const updatedProfile = await newUserProfile.update()

    return res.json({ data: updatedProfile })
  } catch (error) {
    console.error('error updating profile', error.message)
    return sendMessageResponse(res, 500, 'Unable to update new user')
  }
}
