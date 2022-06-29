import Cohort, { createCohort, getCohorts } from '../domain/cohort.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  const { cohort_name: cohortName } = req.body

  try {
    const createdCohort = await createCohort(cohortName)

    if (!(createdCohort instanceof Cohort)) {
      return sendMessageResponse(res, 500, createdCohort.error)
    }

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
