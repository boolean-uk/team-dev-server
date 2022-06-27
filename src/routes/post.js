import { Router } from 'express'
import { create, getAll, createComment } from '../controllers/post.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.post('/comment', validateAuthentication, createComment)

export default router
