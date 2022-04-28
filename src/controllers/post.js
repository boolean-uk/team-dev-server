import dbClient from '../utils/dbClient.js'

import { sendDataResponse } from '../utils/responses.js'

export const create = async (req, res) => {
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }
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
}

export const getAll = async (req, res) => {
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
}
