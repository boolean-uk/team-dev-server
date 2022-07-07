import dbClient from '../utils/dbClient.js'

export async function getDeliveryLogs() {
  const DeliveryLogs = await dbClient.DeliveryLog.findMany({
    include: { 
      user: { 
        include: { 
          profile: true 
        } 
      }, 
      lines: true
     }
  })

  return DeliveryLogs
}

export async function getDeliveryLog(id) {
  id = Number(id)
  const deliveryLog = await dbClient.DeliveryLog.findUnique({
    where: { id },
    include: { 
      user: { 
        include: { 
          profile: true 
        } 
      }, 
      lines: true 
    },
    rejectOnNotFound: true
  })

  return deliveryLog
}

export default class DeliveryLog {
  static fromDb(deliveryLog) {
    return new DeliveryLog(
      deliveryLog.lines,
      deliveryLog.date,
      deliveryLog.userId,
      deliveryLog.cohortId,
      deliveryLog.id
    )
  }

  static async fromJson(json) {
    const { lines, date, userId, cohortId } = json
    return new DeliveryLog(lines, date, userId, cohortId)
  }

  constructor(lines, date, userId, cohortId, id) {
    this.lines = lines
    this.date = date
    this.userId = userId
    this.cohortId = cohortId
    this.id = id
  }

  async save() {
    const createdDeliveryLog = await dbClient.DeliveryLog.create({
      data: {
        lines: this.lines,
        date: this.date,
        userId: this.userId,
        cohortId: this.cohortId
      }
    })
    return DeliveryLog.fromDb(createdDeliveryLog)
  }

  static async findAll() {
    return DeliveryLog._findMany()
  }
}
