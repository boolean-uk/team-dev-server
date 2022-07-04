import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'
import PostComment from '../domain/postComment.js'

export const create = async (req, res) => {
  const { content } = req.body

  try {
    if (!content) {
      throw new Error('Please provide content')
    }

    const postToCreate = await Post.fromJson(req.body)
    postToCreate.userId = req.user.id
    const post = await postToCreate.save()

    return sendDataResponse(res, 201, post)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const editPost = async (req, res) => {
  const { id } = req.params
  try {
    const postToEdit = await Post.fromJson(req.body)
    postToEdit.id = Number(id)
    postToEdit.edited = true
    const post = await postToEdit.update()
    return sendDataResponse(res, 201, post)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const createComment = async (req, res) => {
  const postId = +req.query.postId
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { err: 'Must provide content' })
  }
  try {
    const commentToCreate = await PostComment.fromJson(req.body)
    commentToCreate.userId = req.user.id
    commentToCreate.profileId = req.user.id
    commentToCreate.postId = postId
    const comment = await commentToCreate.save()
    return sendDataResponse(res, 201, comment)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
export const findAllComments = async (req, res) => {
  try {
    const comment = await PostComment.findAll()
    if (comment.length === 0) {
      throw new Error(`Comments not found`)
    }
    const data = { comment }
    return sendDataResponse(res, 201, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll()
    if (posts.length === 0) {
      throw new Error(`Posts not found`)
    }
    const data = { posts }
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
