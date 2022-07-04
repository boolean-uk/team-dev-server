import dbClient from '../utils/dbClient.js'

export default class Post {
  static fromDb(post) {
    return new Post(
      post.content,
      post.userId,
      post.id,
      post.createdAt,
      post.postComments,
      post.user,
      post.profile
    )
  }

  static async fromJson(json) {
    const { content } = json
    return new Post(content)
  }

  constructor(content, userId, id, createdAt, postComments,user, profile) {
    this.userId = userId
    this.content = content
    this.id = id
    this.createdAt = createdAt
    this.postComments = postComments
    this.user = user
    this.profile = profile
  }

  async save() {
    const createdPost = await dbClient.post.create({
      data: {
        content: this.content,
        userId: this.userId,
        createdAt: this.createdAt
      },
      include: { user: { include: { profile: true } } }
    })
    return Post.fromDb(createdPost)
  }

  static async findAll() {
    return Post._findMany()
  }

  static async _findMany() {
    const foundPosts = await dbClient.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { postComments: { include: { profile: true } } }
    })
    return foundPosts.map((post) => Post.fromDb(post))
  }
}
