import express, { Application } from 'express'
import routes from './routes'
import images from './routes/api/images'

const app: Application = express()
const port = 3000

app.use('/api', routes)
app.use('/api/images', images)

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`)
})

export default app
