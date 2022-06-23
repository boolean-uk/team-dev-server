import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'

export const create = async (req, res) => {
  const { content } = req.body
  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }
  try {
    const postToCreate = await Post.fromJson([req.body, req.user.id])

    const posts = await postToCreate.save()
    return sendDataResponse(res, 201, { ...posts })
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
export const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll()
    console.log(posts)
    const data = { posts }
    console.log('DATA:', data)
    return sendDataResponse(res, 200, data)
  } catch (err) {
    return sendDataResponse(res, 400, { err: err.message })
  }
}
