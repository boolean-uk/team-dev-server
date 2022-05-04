import { Router } from 'express'
import {
  create,
  getById,
  getAll,
  updateById,
  getStudentWithoutCohort
} from '../controllers/user.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', create)
router.get('/', validateAuthentication, getAll)
router.get(
  '/studentWithoutCohort',
  validateAuthentication,
  validateTeacherRole,
  getStudentWithoutCohort
)
router.get('/:id', validateAuthentication, getById)
router.put('/', validateAuthentication, updateById)
router.patch('/:id/cohort', validateAuthentication, validateTeacherRole)

export default router
