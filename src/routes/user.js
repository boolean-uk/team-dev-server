import { Router } from 'express'
import {
  create,
  getById,
  getAll,
  updateById,
  updateProfile
} from '../controllers/user.js'
import { findAllConversationsByUserId } from '../controllers/conversation.js'
import { createNote, getAllNotes } from '../controllers/note.js'
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
router.get('/:id/notes', validateAuthentication, getAllNotes)
router.get(
  '/:userId/conversations',
  validateAuthentication,
  findAllConversationsByUserId
)

export default router
