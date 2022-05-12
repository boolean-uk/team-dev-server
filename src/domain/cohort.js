import dbClient from '../utils/dbClient.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort(req) {
  const { cohortName, startDate, endDate } = req.body
  const createdCohort = await dbClient.cohort.create({
    data: {
      cohortName: cohortName,
      startDate: startDate,
      endDate: endDate
    }
  })

  return new Cohort(createdCohort.id)
}

export async function findCohorts() {
  const allCohorts = await dbClient.cohort.findMany({})

  return allCohorts
}

export class Cohort {
  constructor(id = null) {
    this.id = id
  }

  toJSON() {
    return {
      cohort: {
        id: this.id
      }
    }
  }
}
