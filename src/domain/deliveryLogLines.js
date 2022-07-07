import dbClient from '../utils/dbClient.js'

export default class DeliveryLogLines {
  static fromDb(deliveryLogLines) {
    return new DeliveryLogLines(
      deliveryLogLines.content,
      deliveryLogLines.logId
    )
  }

  static async fromJson(json) {
    const { content, logId } = json
    return new DeliveryLogLines(content, logId)
  }

  constructor(content, logId) {
    this.content = content
    this.logId = logId
  }

  async save() {
    const createdDeliveryLogLines = await dbClient.DeliveryLogLine.create({
      data: {
        content: this.content,
        logId: this.logId
      }
    })
    return DeliveryLogLines.fromDb(createdDeliveryLogLines)
  }
}
