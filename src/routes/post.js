import { Router } from 'express'
import {
  create,
  getAll,
  createComment,
  findAllComments,
  deletePost
} from '../controllers/post.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.post('/comment', validateAuthentication, createComment)
router.get('/comment', validateAuthentication, findAllComments)
router.delete('/post-delete/:id', validateAuthentication, deletePost)

export default router
