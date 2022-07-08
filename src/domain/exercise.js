import dbClient from '../utils/dbClient.js'

export async function createExercise(exerciseName, githubUrl) {
  if (typeof exerciseName !== 'string') {
    throw Error('Exercise Name must be of type String')
  }

  if (exerciseName.length < 1) {
    throw Error('Exercise Name must be a String of 1 or more characters')
  }

  const createdExercise = await dbClient.exercise.create({
    data: { exerciseName, githubUrl }
  })

  return new Exercise(createdExercise.id, exerciseName, githubUrl)
}

export async function getExercises() {
  const Exercises = await dbClient.exercise.findMany({
    // include: { cohortExercises: true }
  })

  return Exercises
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
  constructor(id = null, name, githubUrl) {
    this.id = id
    this.name = name
    this.githubUrl = githubUrl
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
        github_url: this.githubUrl
      }
    }
  }

  static fromDb(exercise) {
    return new Exercise(exercise.id, exercise.exerciseName, exercise.githubUrl)
  }
}
