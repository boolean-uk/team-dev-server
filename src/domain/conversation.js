import dbClient from '../utils/dbClient.js'

export default class Conversation {
  static fromDb(conversation) {
    return new Conversation(
      conversation.name,
      conversation.usersIds,
      conversation.id,
      conversation.createdAt,
      conversation.updatedAt,
      conversation.users,
      conversation.messages
    )
  }

  static async fromJson(json) {
    const { name, usersIds } = json
    return new Conversation(name, usersIds)
  }

  constructor(name, usersIds, id, createdAt, updatedAt, users, messages) {
    this.name = name
    this.usersIds = usersIds
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.users = users
    this.messages = messages
  }

  async save() {
    const createdConversation = await dbClient.conversation.create({
      data: {
        name: this.name,
        users: {
          create: this.usersIds.map((id) => {
            return {
              user: {
                connect: {
                  id: id
                }
              }
            }
          })
        }
      },
      include: {
        users: true
      }
    })

    return Conversation.fromDb(createdConversation)
  }

  static async findAll(activeUserId) {
    let foundConversations = await dbClient.conversation.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        users: {
          some: {
            userId: Number(activeUserId)
          }
        }
      },
      include: { messages: true, users: true }
    })
    foundConversations = await Promise.all(
      foundConversations.map(async (conversation) => {
        let newMessages = await dbClient.message.findMany({
          where: {
            conversationId: conversation.id
          },
          include: {
            user: { include: { profile: true } }
          }
        })
        newMessages = newMessages.map((newMessage) => {
          const createdBy = `${newMessage.user.profile.firstName} ${newMessage.user.profile.lastName}`
          return { ...newMessage, createdBy }
        })
        return { ...conversation, messages: newMessages }
      })
    )
    return foundConversations.map((conversation) =>
      Conversation.fromDb(conversation)
    )
  }
}
