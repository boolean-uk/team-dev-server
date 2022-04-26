import { Router } from 'express'
import { create } from '../controllers/cohort.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()
// validateAuthentication, validateTeacherRole,
router.post('/', create)

export default router
