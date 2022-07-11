import { Router } from 'express'
import { getAllExercise } from '../controllers/cohortExercise.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.get('/cohort/:id', validateAuthentication, getAllExercise)

export default router
