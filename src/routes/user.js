import { Router } from 'express'
import {
  create,
  getById,
  getAll,
  updateById,
  getStudents,
  updateUserCohortById,
  addUserToCohort
} from '../controllers/user.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', create)
router.get('/', validateAuthentication, getAll)
router.get(
  '/student?',
  validateAuthentication,
  validateTeacherRole,
  getStudents
)
router.get('/:id', validateAuthentication, getById)
router.put('/', validateAuthentication, updateById)
router.patch(
  '/:id/cohort',
  validateAuthentication,
  validateTeacherRole,
  updateUserCohortById
)
router.patch(
  '/student/cohort/:id',
  // validateAuthentication,
  // validateTeacherRole,
  addUserToCohort
)

export default router
