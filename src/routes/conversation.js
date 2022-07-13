import { Router } from 'express'
import {
  createConversation,
  findAllConversationsByUserId
} from '../controllers/conversation.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, createConversation)
router.get(
  '/user/:userId',
  validateAuthentication,
  findAllConversationsByUserId
)
export default router
