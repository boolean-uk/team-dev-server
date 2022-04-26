import dbClient from '../utils/dbClient.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort(req) {
  const user = req.user

  const createdCohort = await dbClient.cohort.create({
    data: {
      users: {
        connect: {
          id: user
        }
      }
    }
  })

  return new Cohort(createdCohort.id)
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
