import { Router } from 'express'
import { create, cohorts, getCohortById } from '../controllers/cohort.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, validateTeacherRole, create)
router.get('/', validateAuthentication, validateTeacherRole, cohorts)
router.get('/:id', validateAuthentication, validateTeacherRole, getCohortById)

export default router
