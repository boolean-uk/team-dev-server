import {
  createExercise,
  getExercises,
  getExercise
} from '../domain/exercise.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  const {
    exercise_name: exerciseName,
    github_url: githubUrl,
    unit_id: unitId
  } = req.body

  try {
    const createdExercise = await createExercise(
      exerciseName,
      githubUrl,
      unitId
    )

    return sendDataResponse(res, 201, createdExercise)
  } catch (e) {
    return sendMessageResponse(res, 500, e.message)
  }
}

export const exercises = async (req, res) => {
  try {
    const exercises = await getExercises()

    return sendDataResponse(res, 201, exercises)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get Exercises')
  }
}

export const getExerciseById = async (req, res) => {
  const id = req.params.id

  try {
    const exercise = await getExercise(id)

    return sendDataResponse(res, 201, exercise)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get Exercise')
  }
}
