import dbClient from '../utils/dbClient.js'
import { sendDataResponse } from '../utils/responses.js'
import Joi from 'joi'

export const create = async (req, res) => {
  const schema = Joi.object({
    content: Joi.string().min(3).required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    return sendDataResponse(res, 400, { error: error.details[0].message })
  }
  const { content } = value
  try {
    const createdPost = await dbClient.post.create({
      data: {
        content: content,
        user: {
          connect: {
            id: req.user.id
          }
        }
      }
    })
    return sendDataResponse(res, 201, { post: createdPost })
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}

export const createComment = async (req, res) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(150).required()
  })
  const { error, value } = schema.validate(req.body)
  if (error) {
    return sendDataResponse(res, 400, { error: error.details[0].message })
  }
  const { content } = value
  const { postId } = req.params
  const commentOnPost = await dbClient.post.findUnique({
    where: { id: parseInt(postId) }
  })
  if (!commentOnPost) {
    return sendDataResponse(res, 400, {
      post: 'You CANNOT comment on a nonexistent post'
    })
  }
  try {
    const createdComment = await dbClient.postComment.create({
      data: {
        content: content,
        post: {
          connect: {
            id: parseInt(postId)
          }
        },
        user: {
          connect: {
            id: req.user.id
          }
        }
      }
    })
    return sendDataResponse(res, 201, { comment: createdComment })
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const allPosts = await dbClient.post.findMany({
      include: {
        user: {
          include: {
            profile: true
          }
        }
      }
    })
    return sendDataResponse(res, 200, {
      posts: allPosts
    })
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}
