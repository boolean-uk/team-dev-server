import dbClient from '../utils/dbClient.js'

export default class Conversation {
  static fromDb(conversation) {
    return new Conversation(
      conversation.name,
      conversation.createdBy,
      conversation.usersIds,
      conversation.id,
      conversation.createdAt,
      conversation.updatedAt,
      conversation.users
    )
  }

  static async fromJson(json) {
    const { name, createdBy, usersIds } = json
    return new Conversation(name, createdBy, usersIds)
  }

  constructor(name, createdBy, usersIds, id, createdAt, updatedAt, users) {
    this.name = name
    this.createdBy = createdBy
    this.usersIds = usersIds
    this.id = id

    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.users = users
  }

  async save() {
    console.log('THIS : ', this)
    const createdConversation = await dbClient.conversation.create({
      data: {
        name: this.name,
        createdBy: this.createdBy,
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
}
