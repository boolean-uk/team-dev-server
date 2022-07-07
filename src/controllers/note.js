import Note from '../domain/note.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const deleteNote = async (req, res) => {
  const noteId = Number(req.params.id)
  try {
    const data = await Note.delete(noteId)
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
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
