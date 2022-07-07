import { sendDataResponse } from '../utils/responses.js'
import DeliveryLog from '../domain/deliveryLog.js'
import DeliveryLogLines from '../domain/deliveryLogLines.js'

export const create = async (req, res) => {
  const { date, cohort_id: cohortId, lines } = req.body
  const userId = req.user.id
  const newDeliveryLogData = {
    date: new Date(date),
    cohortId: Number(cohortId),
    userId
  }

  const deliveryLogToCreate = await DeliveryLog.fromJson(newDeliveryLogData)
  const deliveryLog = await deliveryLogToCreate.save()

  lines.map(async (line) => {
    const data = { content: line.content, logId: deliveryLog.id }
    const logLineToCreate = await DeliveryLogLines.fromJson(data)
    return await logLineToCreate.save()
  })

  return sendDataResponse(res, 201, { deliveryLog })
}
