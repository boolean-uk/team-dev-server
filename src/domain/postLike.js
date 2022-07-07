import dbClient from '../utils/dbClient.js'

export default class PostLike {
  static fromDb(postLike) {
    return new PostLike(
      postLike.active,
      postLike.userId,
      postLike.postId,
      postLike.id,
      postLike.createdAt,
      postLike.updatedAt
    )
  }

  static async fromJson(active, userId, postId, postLikeId) {
    return new PostLike(active, userId, postId, postLikeId)
  }

  constructor(active, userId, postId, id, createdAt, updatedAt) {
    this.active = active
    this.userId = userId
    this.postId = postId
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  async upsertLike() {
    if (!this.id) {
      const createLike = await dbClient.postLike.create({
        data: {
          userId: this.userId,
          postId: this.postId,
          active: true
        }
      })
      return PostLike.fromDb(createLike)
    } else {
      const updatedPost = await dbClient.postLike.update({
        where: {
          id: this.id
        },
        data: {
          active: this.active === 'true' ? false : true
        }
      })
      return PostLike.fromDb(updatedPost)
    }
  }
}
