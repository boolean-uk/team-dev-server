import dbClient from '../utils/dbClient.js'

export default class Post {
  static fromDb(post) {
    return new Post(post.content, post.userId, post.id)
  }

  static async fromJson(json) {
    const { content } = json[0]
    const userId = json[1]
    console.log(content, userId)
    return new Post(content, userId)
  }

  constructor(content, userId, id) {
    this.userId = userId
    this.content = content
    this.id = id
  }

  async save() {
    const createdPost = await dbClient.post.create({
      data: {
        content: this.content,
        userId: this.userId
      }
    })

    return Post.fromDb(createdPost)
  }

  static async findAll() {
    return Post._findMany()
  }

  static async _findMany() {
    const foundPosts = await dbClient.post.findMany()

    return foundPosts.map((post) => Post.fromDb(post))
  }
}
