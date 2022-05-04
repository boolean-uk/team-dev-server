import { Router } from 'express'
import {
  create,
  getById,
  getAll,
  updateById,
  updateUserCohortById
} from '../controllers/user.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', create)
router.get('/', validateAuthentication, getAll)
router.get('/:id', validateAuthentication, getById)
router.put('/', validateAuthentication, updateById)
router.patch(
  '/:id/cohort',
  validateAuthentication,
  validateTeacherRole,
  updateUserCohortById
)

export default router
