import dbClient from '../utils/dbClient.js'

export default class Message {
  static fromDb(message) {
    return new Message(
      message.content,
      message.createdBy,
      message.userId,
      message.conversationId,
      message.id,
      message.createdAt,
      message.updatedAt
    )
  }

  static async fromJson(json) {
    const { content, createdBy, userId, conversationId } = json
    return new Message(content, createdBy, userId, conversationId)
  }

  constructor(
    content,
    createdBy,
    userId,
    conversationId,
    id,
    createdAt,
    updatedAt
  ) {
    this.content = content
    this.createdBy = createdBy
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
        createdBy: this.createdBy,
        userId: this.userId,
        conversationId: this.conversationId
      }
    })
    return Message.fromDb(createdMessage)
  }
}
