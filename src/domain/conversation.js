import dbClient from '../utils/dbClient'

export default class Conversation {
  static fromDb(conversation) {
    return new Conversation(
      conversation.name,
      conversation.createdBy,
      conversation.id,

      conversation.messages,
      conversation.createdAt,
      conversation.updatedAt,
      conversation.users,

      conversation.messages
    )
  }

  static async fromJson(json) {
    const { name, createdBy, usersIds } = json
    return new Conversation(name, createdBy, usersIds)
  }

  constructor(name, createdBy, id, messages, createdAt, updatedAt, users) {
    this.name = name
    this.createdBy = createdBy
    this.id = id

    this.messages = messages
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.users = users
  }

  async save() {
    const createdConversation = await dbClient.post.create({
      data: {
        name: this.name,
        createdBy: this.createdBy,
        userIds: this.userIds,
        messages: {
          create: [
            {
              createdBy: this.createdBy,
              content: this.content
            }
          ]
        }
      }
    })

    return Conversation.fromDb(createdConversation)
  }
}
