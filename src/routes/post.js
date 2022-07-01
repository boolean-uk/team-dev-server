import { Router } from 'express'
import {
  create,
  getAll,
  createComment,
  findAllComments,
  editPost
} from '../controllers/post.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.patch('/:id', validateAuthentication, editPost)
router.post('/comment', validateAuthentication, createComment)
router.get('/comment', validateAuthentication, findAllComments)

export default router
