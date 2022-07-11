import { Router } from 'express'
import { createConversation } from '../controllers/conversation.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/conversation', validateAuthentication, createConversation)

export default router
