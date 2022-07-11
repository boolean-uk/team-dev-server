import { sendDataResponse } from '../utils/responses.js'
import Conversation from '../domain/conversation.js'

export const createConversation = async (req, res) => {
  const { name, createdBy, usersIds } = req.body
  console.log('REQ_BODY : ', req.body)
  try {
    if (!name || usersIds.length === 0 || !createdBy) {
      throw new Error('Please provide appropriate content')
    }
    const conversationToCreate = await Conversation.fromJson(req.body)
    console.log('conversationToCreate : ', conversationToCreate)
    const conversation = await conversationToCreate.save()

    return sendDataResponse(res, 201, conversation)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
