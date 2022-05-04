import { Router } from 'express'
import { create, getAll, createComment, likePost } from '../controllers/post.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.post('/:postId/comment', validateAuthentication, createComment)
router.post('/:postId/like', validateAuthentication, likePost)

export default router
