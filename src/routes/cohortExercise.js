import { Router } from 'express'
import { getAllCohortExercise } from '../controllers/cohortExercise.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.get('/cohort/:id', validateAuthentication, getAllCohortExercise)

export default router
