import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'
import DeliveryLog, {
  getDeliveryLogs,
  getDeliveryLog
} from '../domain/deliveryLog.js'
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

export const deliveryLogs = async (req, res) => {
  try {
    const deliveryLogs = await getDeliveryLogs()

    return sendDataResponse(res, 201, deliveryLogs)
  } catch (e) {
    return sendMessageResponse(res, 500, e.message)
  }
}

export const deliveryLogById = async (req, res) => {
  const { id } = req.params

  try {
    const deliveryLog = await getDeliveryLog(id)

    return sendDataResponse(res, 201, deliveryLog)
  } catch (e) {
    return sendMessageResponse(res, 500, e.message)
  }
}
