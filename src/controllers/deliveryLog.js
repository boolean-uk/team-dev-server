import { sendDataResponse } from '../utils/responses.js'
import DeliveryLog from '../domain/deliveryLog.js'
import DeliveryLogLines from '../domain/deliveryLogLines.js'

export const create = async (req, res) => {
  const { date, cohort_id: cohortId, lines } = req.body
  const userId = req.user.id
  const newDeliveryLogData = {
    date: new Date(date),
    cohortId,
    userId
  }

  const deliveryLogToCreate = await DeliveryLog.fromJson(newDeliveryLogData)
  const deliveryLog = await deliveryLogToCreate.save()

  const deliveryLogLines = []

  for (const line of lines) {
    const lineContent = line.content
    const json = { content: lineContent, logId: deliveryLog.id }
    const newDeliveryLogLineData = await DeliveryLogLines.fromJson(json)
    deliveryLogLines.push(newDeliveryLogLineData)
  }

  for (const deliveryLogLineToCreate of deliveryLogLines) {
    deliveryLogLineToCreate.save()
  }

  return sendDataResponse(res, 201, { deliveryLog })
}
