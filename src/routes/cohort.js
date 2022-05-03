import { Router } from 'express'
import { create } from '../controllers/cohort.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()
router.post('/', validateAuthentication, validateTeacherRole, create)

export default router
