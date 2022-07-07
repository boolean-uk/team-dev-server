import dbClient from '../utils/dbClient.js'

export default class Post {
  static fromDb(post) {
    return new Post(
      post.content,
      post.id,
      post.createdAt,
      post.postComments,
      post.edited,
      post.user,
      post.profile,
      post.postLikes
    )
  }

  static async fromJson(json) {
    const { content } = json
    return new Post(content)
  }

  constructor(content, id, createdAt, postComments, edited, user, profile,postLikes) {
    this.content = content
    this.id = id
    this.createdAt = createdAt
    this.postComments = postComments
    this.edited = edited
    this.user = user
    this.profile = profile
    this.postLikes = postLikes
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

  async update() {
    const findPost = await dbClient.post.findUnique({
      where: { id: this.id }
    })

    const updatedPost = await dbClient.post.update({
      where: {
        id: this.id
      },
      data: {
        content: this.content,
        edited: findPost.edited ? undefined : true
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
      include: {
        postComments: { include: { profile: true } },
        user: { include: { profile: true } },
        postLikes:true
      }
    })
    return foundPosts.map((post) => Post.fromDb(post))
  }

  static async delete(foundId) {
    await dbClient.post.delete({
      where: {
        id: foundId
      }
    })
  }
}
