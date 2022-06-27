import dbClient from '../utils/dbClient.js'

export default class Comment {
  static fromDb(comment) {
    return new Comment(
      comment.content,
      comment.userId,
      comment.id,
      comment.createdAt,
      comment.profileId,
      comment.postId,
      comment.updatedAt
    )
  }

  static async fromJson(json) {
    const { content } = json
    return new Comment(content)
  }

  constructor(content, userId, id, createdAt, profileId, postId, updatedAt) {
    this.userId = userId
    this.content = content
    this.id = id
    this.createdAt = createdAt
    this.profileId = profileId
    this.postId = postId
    this.updatedAt = updatedAt
  }

  async save() {
    const createdComment = await dbClient.postComment.create({
      data: {
        content: this.content,
        userId: this.userId,
        profileId: this.profileId,
        postId: this.postId
      }
    })

    return Comment.fromDb(createdComment)
  }
}
