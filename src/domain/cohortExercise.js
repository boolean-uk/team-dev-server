import dbClient from '../utils/dbClient.js'

export default class CohortExercise {
  static fromDb(exercise) {
    return new CohortExercise(
      exercise.id,
      exercise.exerciseId,
      exercise.cohortId,
      exercise.Exercise,
      exercise.Exercise.Unit
    )
  }

  static async fromJson(json) {
    const { id, exerciseId, cohortId } = json
    return new CohortExercise(id, exerciseId, cohortId)
  }

  constructor(id, exerciseId, cohortId, exercise, unit) {
    this.id = id
    this.exerciseId = exerciseId
    this.cohortId = cohortId
    this.exercise = exercise
    this.unit = unit
  }

  async save() {
    const createdExercise = await dbClient.CohortExercise.create({
      data: {
        exerciseId: this.exerciseId,
        cohortId: this.cohortId
      }
    })
    return CohortExercise.fromDb(createdExercise)
  }

  static async findAll(query) {
    return CohortExercise._findMany(query)
  }

  static async _findMany(query) {
    const foundExercises = await dbClient.CohortExercise.findMany({
      orderBy: { createdAt: 'desc' },
      ...query
    })
    return foundExercises.map((exercise) => CohortExercise.fromDb(exercise))
  }

  static async delete(foundId) {
    await dbClient.CohortExercise.delete({
      where: {
        exerciseId: foundId
      }
    })
  }

  toJSON() {
    return {
      cohortExercise: {
        id: this.id,
        exerciseId: this.exerciseId,
        cohortId: this.cohortId,
        exercise: {
          id: this.exercise.id,
          exerciseName: this.exercise.exerciseName,
          githubUrl: this.exercise.githubUrl,
          unitId: this.exercise.unitId,
          unit: this.exercise.Unit,
          createdAt: this.exercise.createdAt,
          updatedAt: this.exercise.updatedAt,
          cohortExercises: this.exercise.cohortExercises
        }
      }
    }
  }

  static async findById(exerciseId) {
    return CohortExercise._findUnique(exerciseId)
  }

  static async _findUnique(exerciseId) {
    const foundExercise = await dbClient.CohortExercise.findUnique({
      where: {
        exerciseId: exerciseId
      },
      rejectOnNotFound: true
    })
    return CohortExercise.fromDb(foundExercise)
  }

  static async createCohortExercise(exerciseId, cohortId) {
    const createdCohortExercise = await dbClient.CohortExercise.create({
      data: { exerciseId, cohortId }
    })
    return new CohortExercise(createdCohortExercise.id, exerciseId, cohortId)
  }
}
