import dbClient from '../utils/dbClient.js'

export async function createExercise(exerciseName, githubUrl, unitId) {
  if (typeof exerciseName !== 'string') {
    throw Error('Exercise Name must be of type String')
  }

  if (exerciseName.length < 1) {
    throw Error('Exercise Name must be a String of 1 or more characters')
  }

  const createdExercise = await dbClient.exercise.create({
    data: { exerciseName, githubUrl, unitId }
  })

  return new Exercise(createdExercise.id, exerciseName, githubUrl, unitId)
}

export async function getExercises() {
  const exercises = await dbClient.exercise.findMany({})

  return exercises
}

export async function getExercise(id) {
  id = Number(id)
  const exercise = await dbClient.exercise.findUnique({
    where: { id },
    include: { cohortExercises: true },
    rejectOnNotFound: true
  })

  return exercise
}

export default class Exercise {
  constructor(id = null, name, githubUrl, unitId) {
    this.id = id
    this.name = name
    this.githubUrl = githubUrl
    this.unitId = unitId
  }

  static async findExerciseByID(id) {
    let foundExercise
    if (typeof id === 'number') {
      foundExercise = await dbClient.exercise.findUnique({
        where: {
          id: id
        }
      })
    }

    if (foundExercise) {
      return Exercise.fromDb(foundExercise)
    }
    return null
  }

  toJSON() {
    return {
      exercise: {
        id: this.id,
        cohort_name: this.name,
        github_url: this.githubUrl,
        unit_Id: this.unitId
      }
    }
  }

  static fromDb(exercise) {
    return new Exercise(
      exercise.id,
      exercise.exerciseName,
      exercise.githubUrl,
      exercise.unitId
    )
  }
}
