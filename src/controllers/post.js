import { sendDataResponse } from '../utils/responses.js'
const jwt = import('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

export const create = async (req, res) => {
  const { content } = req.body
  // 1 verify token
  const [bearer, token] = req.headers.authorization.split(' ')
  console.log('Token =>', token)
  console.log('bearer =>', bearer)
  const verifyToken = jwt.verify(token, jwtSecret)

  try {
    if (!content) {
      return sendDataResponse(res, 400, { content: 'Must provide content' })
    }
    const createPost = await prisma.post.create({
      data: {
        content
      }
    })
    return sendDataResponse(res, 201, { post: { id: 1, content } })
  } catch (e) {
    return sendDataResponse(res, 404, { content: 'Token invalid' })
  }

  // return sendDataResponse(res, 201, { post: { id: 1, content } })
}

export const getAll = async (req, res) => {
  return sendDataResponse(res, 200, {
    posts: [
      {
        id: 1,
        content: 'Hello world!',
        author: { ...req.user }
      },
      {
        id: 2,
        content: 'Hello from the void!',
        author: { ...req.user }
      }
    ]
  })
}
