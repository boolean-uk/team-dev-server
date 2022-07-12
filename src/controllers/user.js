import User from '../domain/user.js'
import Cohort from '../domain/cohort.js'
import Note from '../domain/note.js'
import jwt from 'jsonwebtoken'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import { JWT_EXPIRY, JWT_SECRET } from '../utils/config.js'

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
  const {
    first_name: firstName,
    cohort: inCohort,
    cohort_id: cohortId
  } = req.query

  const whereData = {}
  if (inCohort === 'false') {
    whereData.cohort = null
  }

  if (cohortId) {
    whereData.cohortId = Number(cohortId)
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
  const userToUpdateId = Number(req.params.id)
  try {
    const userToUpdate = await User.findById(userToUpdateId)
    const foundCohort = await Cohort.findCohortByID(cohortId)

    if (!userToUpdate) {
      return sendDataResponse(res, 400, { message: 'User does not exist' })
    }
    if (!cohortId) {
      return sendDataResponse(res, 400, { message: 'Cohort ID is required' })
    }
    if (typeof cohortId !== 'number') {
      return sendDataResponse(res, 400, {
        message: 'Cohort ID must be a integer'
      })
    }
    if (foundCohort === null) {
      return sendDataResponse(res, 400, {
        message: 'Cohort could not be found'
      })
    }

    userToUpdate.cohortId = cohortId
    const updatedProfile = await userToUpdate.update()

    return sendDataResponse(res, 200, {
      user: { cohort_id: updatedProfile.cohortId }
    })
  } catch (error) {
    console.error('error updating profile', error.message)
    return sendMessageResponse(res, 500, 'Unable to communicate with database')
  }
}

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

export const createNote = async (req, res) => {
  const teacherId = req.user.id
  const studentId = Number(req.params.id)
  const { content, isEdited } = req.body
  const newNoteData = {
    teacherId,
    studentId,
    content,
    isEdited
  }

  try {
    if (!content) {
      throw new Error('Please provide content')
    }
    if (req.user.role !== 'TEACHER') {
      throw new Error('You are not authorized to create a note')
    }
    const noteToCreate = await Note.fromJson(newNoteData)
    const note = await noteToCreate.save()

    return sendDataResponse(res, 201, note)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const deleteNote = async (req, res) => {
  const noteId = Number(req.params.id)
  try {
    if (!noteId) throw new Error('The note does not exist')
    const data = await Note.delete(noteId)
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const getAllNotes = async (req, res) => {
  const userId = Number(req.params.id)
  const whereData = {}
  whereData.studentId = userId

  try {
    const foundNotes = await Note.findAll({ whereData })

    const formattedNotes = foundNotes.map((note) => {
      return {
        ...note.toJSON().note
      }
    })

    return sendDataResponse(res, 200, { notes: formattedNotes })
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get notes')
  }
}

export const getNoteById = async (req, res) => {
  const noteId = Number(req.params.id)

  try {
    const foundNote = await Note.findById(noteId)

    return sendDataResponse(res, 200, foundNote)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get note')
  }
}

export const updateNoteById = async (req, res) => {
  const { id } = req.params
  try {
    const noteToEdit = await Note.fromJson(req.body)
    noteToEdit.id = Number(id)
    const note = await noteToEdit.update()
    return sendDataResponse(res, 201, note)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
