import { Router } from 'express'
import { create, getAll } from '../controllers/post.js'
// import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

// router.post('/', validateAuthentication, create)
// router.get('/', validateAuthentication, getAll)
router.post('/', create)
router.get('/', getAll)

export default router
