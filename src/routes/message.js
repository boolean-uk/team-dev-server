import { Router } from 'express'
import { validateAuthentication } from '../middleware/auth.js'
import { createMessage } from '../controllers/message.js'

const router = Router()

router.post('/', validateAuthentication, createMessage)

export default router
