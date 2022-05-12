import { createCohort, findCohort, findCohorts } from '../domain/cohort.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  try {
    const createdCohort = await createCohort(req)
    return sendDataResponse(res, 201, createdCohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to create cohort')
  }
}

export const getCohort = async (req, res) => {
  const { id } = req.query
  try {
    let cohortResult
    if (id) {
      cohortResult = await findCohort(id)
    } else {
      cohortResult = await findCohorts()
    }
    return sendDataResponse(res, 200, cohortResult)
  } catch (e) {
    return sendMessageResponse(res, 404, 'Cohorts not found')
  }
}
