import { sendDataResponse } from '../utils/responses.js'
import Conversation from '../domain/conversation.js'

export const createConversation = async (req, res) => {
  const { name, usersIds } = req.body

  try {
    if (!name || usersIds.length === 0) {
      throw new Error('Please provide appropriate content')
    }
    const conversationToCreate = await Conversation.fromJson(req.body)
    const conversation = await conversationToCreate.save()
    return sendDataResponse(res, 201, conversation)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const findAllConversationsByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const conversations = await Conversation.findAll(userId)

    const data = { conversations }
    return sendDataResponse(res, 201, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
