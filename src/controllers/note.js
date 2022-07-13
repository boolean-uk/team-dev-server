import Note from '../domain/note.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

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
