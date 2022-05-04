import { Router } from 'express'
import { create, getAll } from '../controllers/posts/post.js'
import { createComment } from '../controllers/posts/comments.js'
import { likePost, unlikePost } from '../controllers/posts/likes.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.post('/:postId/comment', validateAuthentication, createComment)
router.post('/:postId/like', validateAuthentication, likePost)
router.delete('/like/:likeId', validateAuthentication, unlikePost)

export default router
