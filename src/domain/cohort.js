import dbClient from '../utils/dbClient.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort(cohortName) {
  if (typeof cohortName !== 'string') {
    throw Error('cohortName must be of type String')
  }

  if (cohortName.length < 1) {
    throw Error('cohortName must be a String of 1 or more characters')
  }

  const createdCohort = await dbClient.cohort.create({
    data: { cohortName }
  })

  return new Cohort(createdCohort.id, cohortName)
}

/**
 * Gets all Cohorts in the database
 */
export async function getCohorts() {
  const Cohorts = await dbClient.cohort.findMany({})

  return Cohorts
}

export default class Cohort {
  constructor(id = null, name) {
    this.id = id
    this.name = name
  }

  toJSON() {
    return {
      cohort: {
        id: this.id,
        cohort_name: this.name
      }
    }
  }

  static fromDb(cohort) {
    return new Cohort(cohort.id, cohort.cohortName)
  }
}
