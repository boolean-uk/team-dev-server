import CohortExercise from '../domain/cohortExercise.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const getAllExercise = async (req, res) => {
  const cohortId = Number(req.params.id)
  const whereData = {}
  whereData.cohortId = cohortId

  try {
    const foundExercise = await CohortExercise.findAll({ whereData })

    const formattedExercise = foundExercise.map((exercise) => {
      return {
        ...exercise.toJSON().exercise
      }
    })

    return sendDataResponse(res, 200, { notes: formattedExercise })
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get exercise')
  }
}
