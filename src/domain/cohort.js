import dbClient from '../utils/dbClient.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort() {
  const createdCohort = await dbClient.cohort.create({
    data: {}
  })

  return new Cohort(createdCohort.id)
}

/**
 * Gets all Cohorts in the database
 */
export async function getCohorts() {
  const Cohorts = await dbClient.cohort.findMany({})

  return Cohorts
}

export default class Cohort {
  constructor(id = null) {
    this.id = id
  }

  static async findCohortByID(id) {
    let foundCohort
    if (typeof id === 'number') {
      foundCohort = await dbClient.cohort.findUnique({
        where: {
          id: id
        }
      })
    }

    if (foundCohort) {
      return Cohort.fromDb(foundCohort)
    }
    return null
  }

  toJSON() {
    return {
      cohort: {
        id: this.id
      }
    }
  }

  static fromDb(cohort) {
    return new Cohort(cohort.id)
  }
}
