import express, { Application, Request, Response } from 'express'
import routes from './routes'
import images from './routes/api/images'

const app: Application = express()
const port = 3000

app.get('/', (req: Request, res: Response): void => {
  res.send('this is homepage.')
})
app.use('/api', routes)
app.use('/api/images', images)

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`)
})

export default app
