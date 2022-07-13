import dbClient from '../utils/dbClient.js'

export default class Message {
  static fromDb(message) {
    return new Message(
      message.content,
      message.userId,
      message.conversationId,
      message.id,
      message.createdAt,
      message.updatedAt
    )
  }

  static async fromJson(json) {
    const { content, userId, conversationId } = json
    return new Message(content, userId, conversationId)
  }

  constructor(content, userId, conversationId, id, createdAt, updatedAt) {
    this.content = content
    this.userId = userId
    this.conversationId = conversationId
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  async save() {
    const createdMessage = await dbClient.message.create({
      data: {
        content: this.content,
        userId: this.userId,
        conversationId: this.conversationId
      }
    })
    return Message.fromDb(createdMessage)
  }
}
