import dbClient from '../../utils/dbClient.js'
import Joi from 'joi'
import { sendDataResponse } from '../../utils/responses.js'

export const create = async (req, res) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(150).required()
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
      },
      include: {
        user: {
          include: {
            profile: true
          }
        }
      }
    })
    return sendDataResponse(res, 201, { post: createdPost })
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
        },
        postComments: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: {
              include: {
                profile: true
              }
            }
          }
        },
        postLike: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    })
    return sendDataResponse(res, 200, {
      posts: allPosts
    })
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}
