import { Router } from 'express'
import { validateAuthentication } from '../middleware/auth.js'
import { createConversation } from '../controllers/conversation.js'

const router = Router()

router.post('/', validateAuthentication, createConversation)

export default router
