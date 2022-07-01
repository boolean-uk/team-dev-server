import dbClient from '../utils/dbClient.js'

export default class Post {
  static fromDb(post) {
    return new Post(
      post.content,
      post.userId,
      post.id,
      post.createdAt,
      post.postComments,
      post.edited
    )
  }

  static async fromJson(json) {
    const { content } = json
    return new Post(content)
  }

  constructor(content, userId, id, createdAt, postComments, edited) {
    this.userId = userId
    this.content = content
    this.id = id
    this.createdAt = createdAt
    this.postComments = postComments
    this.edited = edited
  }

  async save() {
    const createdPost = await dbClient.post.create({
      data: {
        content: this.content,
        userId: this.userId,
        createdAt: this.createdAt
      }
    })
    return Post.fromDb(createdPost)
  }

  async update() {
    const updatedPost = await dbClient.post.update({
      where: {
        id: this.id
      },
      data: {
        content: this.content,
        edited: this.edited
      }
    })
    return Post.fromDb(updatedPost)
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
