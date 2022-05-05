import { createCohort, findCohorts } from '../domain/cohort.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  try {
    const createdCohort = await createCohort()

    return sendDataResponse(res, 201, createdCohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to create cohort')
  }
}

export const getCohort = async (req, res) => {
  try {
    const getCohort = await findCohorts()
    return sendDataResponse(res, 200, getCohort)
  } catch (e) {
    return sendMessageResponse(res, 404, 'Cohorts not found')
  }
}
