import express from 'express'
import routes from './routes'
import images from './routes/api/images'

const app = express()
const port = 3000

app.use('/api', routes)
app.use('/api/images', images)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})

export default app
