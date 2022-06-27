import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'
import Comment from '../domain/comment.js'

export const create = async (req, res) => {
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }
  try {
    const postToCreate = await Post.fromJson(req.body)
    postToCreate.userId = req.user.id
    const post = await postToCreate.save()
    return sendDataResponse(res, 201, post)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const createComment = async (req, res) => {
  const postId = +req.query.postId
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }
  try {
    const commentToCreate = await Comment.fromJson(req.body)
    commentToCreate.userId = req.user.id
    commentToCreate.profileId = req.user.id
    commentToCreate.postId = postId
    const comment = await commentToCreate.save()
    return sendDataResponse(res, 201, comment)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll()
    const data = { posts }
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
