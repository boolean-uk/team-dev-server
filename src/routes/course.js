import { Router } from 'express'
import { courses } from '../controllers/course.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.get('/', validateAuthentication, validateTeacherRole, courses)

export default router
