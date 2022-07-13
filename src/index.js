import app from './app.js'

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`\n Server is running on port ${port}\n`)
})
