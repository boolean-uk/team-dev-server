import dbClient from '../utils/dbClient.js'

export default class Submission {
  static fromDb(submission) {
    return new Submission(
      submission.userId,
      submission.cohortExerciseId,
      submission.id,
      submission.createdAt,
      submission.updatedAt
    )
  }

  static async fromJson(json) {
    const { userId, cohortExerciseId } = json
    return new Submission(userId, cohortExerciseId)
  }

  constructor(userId, cohortExerciseId) {
    this.userId = userId
    this.cohortExerciseId = cohortExerciseId
  }

  async save() {
    const createdSubmission = await dbClient.Submission.create({
      data: {
        userId: this.userId,
        cohortExerciseId: this.cohortExerciseId
      }
    })
    return Submission.fromDb(createdSubmission)
  }

  toJSON() {
    return {
      submission: {
        id: this.id,
        userId: this.userId,
        cohortExerciseId: this.cohortExerciseId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }
  }
}
