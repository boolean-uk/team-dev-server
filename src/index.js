import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.js'
import postRouter from './routes/post.js'
import authRouter from './routes/auth.js'
import cohortRouter from './routes/cohort.js'
import noteRouter from './routes/note.js'
import exerciseRouter from './routes/exercise.js'
import courseRouter from './routes/course.js'
import deliveryLogRouter from './routes/deliveryLog.js'
import conversationRouter from './routes/conversation.js'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter)
app.use('/users', userRouter)
app.use('/post', postRouter)
app.use('/posts', postRouter)
app.use('/cohort', cohortRouter)
app.use('/log', deliveryLogRouter)
app.use('/note', noteRouter)
app.use('/', authRouter)
<<<<<<< HEAD
app.use('/messages', conversationRouter)
=======
app.use('/exercises', exerciseRouter)
app.use('/courses', courseRouter)
>>>>>>> main

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: {
      resource: 'Not found'
    }
  })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`\n Server is running on port ${port}\n`)
})
