import { sendDataResponse } from '../utils/responses.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const create = async (req, res) => {
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId: req.user.id
      }
    })
    return sendDataResponse(res, 201, { ...post })
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
export const getAll = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({})
    const data = { posts }
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
