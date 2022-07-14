import { sendDataResponse } from '../utils/responses.js'
import Message from '../domain/message.js'

export const createMessage = async (req, res) => {
  const { content } = req.body

  try {
    if (!content) {
      throw new Error('Content must be provided')
    }
    const messageToCreate = await Message.fromJson(req.body)
    const message = await messageToCreate.save()
    return sendDataResponse(res, 201, message)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
