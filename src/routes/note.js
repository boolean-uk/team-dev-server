import { Router } from 'express'
import { getNoteById, updateNoteById, deleteNote } from '../controllers/note.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.delete('/:id', validateAuthentication, deleteNote)
router.get('/:id', validateAuthentication, getNoteById)
router.patch(
  '/:id',
  validateAuthentication,
  validateTeacherRole,
  updateNoteById
)
export default router
