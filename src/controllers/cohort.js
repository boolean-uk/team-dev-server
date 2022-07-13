import { createCohort, getCohorts, getCohort } from '../domain/cohort.js'
import CohortExercise from '../domain/cohortExercise.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import User from '../domain/user.js'

export const create = async (req, res) => {
  const {
    cohort_name: cohortName,
    start_date: startDate,
    end_date: endDate
  } = req.body

  const startDateFormatted = new Date(startDate)
  const endDateFormatted = new Date(endDate)

  try {
    const createdCohort = await createCohort(
      cohortName,
      startDateFormatted,
      endDateFormatted
    )

    return sendDataResponse(res, 201, createdCohort)
  } catch (e) {
    return sendMessageResponse(res, 500, e.message)
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

    if (req.query.availableStudents === 'true') {
      const students = await User.findAll({ whereData: { cohortId: null } })
      cohort.availableStudents = students
    }

    return sendDataResponse(res, 201, cohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get cohort')
  }
}

export const getAllCohortExercises = async (req, res) => {
  const cohortId = Number(req.params.id)
  const whereData = {}
  whereData.cohortId = cohortId

  try {
    const foundExercises = await CohortExercise.findAll({ whereData })

    const formattedExercises = foundExercises.map((exercise) => {
      return {
        ...exercise.toJSON().exercise
      }
    })
    return sendDataResponse(res, 200, { cohortExercises: formattedExercises })
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get exercise')
  }
}

export const createCohortExercise = async (req, res) => {
  const { exerciseId, cohortId } = req.body

  try {
    const createCohortExercise = await CohortExercise.createdCohortExercise(
      exerciseId,
      cohortId
    )

    return sendDataResponse(res, 201, createCohortExercise)
  } catch (e) {
    return sendMessageResponse(res, 500, e.message)
  }
}
