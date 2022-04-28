import { Router } from 'express'
import { create, getById, getAll, updateById } from '../controllers/user.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', create)
router.get('/', validateAuthentication, getAll)
router.get('/:id', validateAuthentication, getById)
router.patch('/:id', validateAuthentication, updateById)
// removed validateTeacherRole middleware from the pathc method above ⬆
export default router
