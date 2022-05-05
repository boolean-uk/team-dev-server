import { Router } from 'express'
import { create, getCohort } from '../controllers/cohort.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()
router.post('/', validateAuthentication, validateTeacherRole, create)
router.get('/', validateAuthentication, validateTeacherRole, getCohort)
export default router
