import { createCohort, getCohorts, getCohort } from '../domain/cohort.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  try {
    const createdCohort = await createCohort()

    return sendDataResponse(res, 201, createdCohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to create cohort')
  }
}

export const cohorts = async (req, res) => {
  try {
    const cohorts = await getCohorts()

    return sendDataResponse(res, 201, cohorts)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get cohorts')
  }
}

export const getCohortById = async (req, res) => {
  const id = req.params.id

  try {
    const cohort = await getCohort(id)

    return sendDataResponse(res, 201, cohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get cohort')
  }
}
