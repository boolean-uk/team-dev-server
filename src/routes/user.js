import { Router } from 'express'
import {
  create,
  getById,
  getAll,
  updateById,
  updateProfile,
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNoteById
} from '../controllers/user.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', create)
router.get('/', validateAuthentication, getAll)
router.get('/:id', validateAuthentication, getById)
router.patch('/:id', validateAuthentication, validateTeacherRole, updateById)
router.patch('/update/:id', validateAuthentication, updateProfile)
router.post('/:id/note', validateAuthentication, createNote)
router.delete('/notes/:id', validateAuthentication, deleteNote)
router.get('/:id/notes', validateAuthentication, getAllNotes)
router.get('/notes/:id', validateAuthentication, getNoteById)
router.patch(
  '/notes/:id',
  validateAuthentication,
  validateTeacherRole,
  updateNoteById
)

export default router
