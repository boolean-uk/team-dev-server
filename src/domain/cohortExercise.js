import dbClient from '../utils/dbClient.js'

export default class CohortExercise {
  static fromDb(exercise) {
    return new CohortExercise(
      exercise.id,
      exercise.exerciseId,
      exercise.cohortId
    )
  }

  static async fromJson(json) {
    const { id, exerciseId, cohortId } = json
    return new CohortExercise(id, exerciseId, cohortId)
  }

  constructor(id, exerciseId, cohortId) {
    this.id = id
    this.exerciseId = exerciseId
    this.cohortId = cohortId
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

  static async findAll({ whereData }) {
    return CohortExercise._findMany({ whereData })
  }

  static async _findMany({ whereData }) {
    const foundExercise = await dbClient.CohortExercise.findMany({
      orderBy: { createdAt: 'desc' },
      where: { ...whereData }
    })
    return foundExercise.map((exercise) => CohortExercise.fromDb(exercise))
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
      exercise: {
        id: this.id,
        exerciseId: this.exerciseId,
        cohortId: this.cohortId
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
}
