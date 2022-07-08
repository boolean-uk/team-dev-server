import { Router } from 'express'
import {
  create,
  deliveryLogs,
  deliveryLogById
} from '../controllers/deliveryLog.js'
import {
  validateAuthentication,
  validateTeacherRole
} from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, validateTeacherRole, create)
router.get('/', validateAuthentication, validateTeacherRole, deliveryLogs)
router.get('/:id', validateAuthentication, validateTeacherRole, deliveryLogById)

export default router
