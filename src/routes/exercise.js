import { Router } from 'express'
import { create, exercises, getExerciseById } from '../controllers/exercise.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, validateTeacherRole, create)
router.get('/', validateAuthentication, validateTeacherRole, exercises)
router.get('/:id', validateAuthentication, validateTeacherRole, getExerciseById)

export default router
