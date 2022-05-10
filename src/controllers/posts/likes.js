import dbClient from '../../utils/dbClient.js'
import { sendDataResponse } from '../../utils/responses.js'

export const likePost = async (req, res) => {
  const { postId } = req.params
  const { id } = req.user
  try {
    const likeOnPost = await dbClient.post.findUnique({
      where: { id: parseInt(postId) }
    })
    if (!likeOnPost) {
      return sendDataResponse(res, 404, { error: 'Post not found' })
    }
    const like = await dbClient.postLike.create({
      data: {
        post: {
          connect: {
            id: parseInt(postId)
          }
        },
        user: {
          connect: {
            id: id
          }
        }
      }
    })
    return sendDataResponse(res, 201, like)
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}

export const unlikePost = async (req, res) => {
  const { likeId } = req.params
  try {
    const deletedLike = await dbClient.postLike.delete({
      where: { id: parseInt(likeId) }
    })
    return sendDataResponse(res, 202, deletedLike)
  } catch (e) {
    return sendDataResponse(res, 500, { error: e.message })
  }
}
