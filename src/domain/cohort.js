import dbClient from '../utils/dbClient.js'
import User from '../domain/user.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort(cohortName, startDate, endDate) {
  if (typeof cohortName !== 'string') {
    throw Error('cohortName must be of type String')
  }

  if (cohortName.length < 1) {
    throw Error('cohortName must be a String of 1 or more characters')
  }

  const createdCohort = await dbClient.cohort.create({
    data: { cohortName, startDate, endDate }
  })

  return new Cohort(createdCohort.id, cohortName, startDate, endDate)
}

/**
 * Gets all Cohorts in the database
 */
export async function getCohorts() {
  const Cohorts = await dbClient.cohort.findMany({})

  return Cohorts
}

export async function getCohort(id) {
  id = Number(id)
  const cohort = await dbClient.cohort.findUnique({
    where: { id },
    include: { users: { include: { profile: true } } },
    rejectOnNotFound: true
  })

  cohort.users = cohort.users.map((user) => User.fromDb(user))

  return cohort
}

export default class Cohort {
  constructor(id = null, name, startDate, endDate) {
    this.id = id
    this.name = name
    this.startDate = startDate
    this.endDate = endDate
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
        id: this.id,
        cohort_name: this.name,
        start_date: this.startDate,
        end_date: this.endDate
      }
    }
  }

  static fromDb(cohort) {
    return new Cohort(
      cohort.id,
      cohort.cohortName,
      cohort.startDate,
      cohort.endDate
    )
  }
}
