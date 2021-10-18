import express, { Request, Response } from 'express'
import fs from 'fs'
import { resizeImage } from '../../utils/processImage'

const images = express.Router()

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.query
  const width = Number(req.query.width)
  const height = Number(req.query.height)

  if (!filename) {
    console.log('filename can not be empty')

    res.send({
      error: 'filename can not be empty',
    })

    return
  }

  if (!Boolean(width) || !Boolean(height)) {
    console.log('invalid input of width and height')

    res.send({
      error: 'invalid input of width and height',
    })

    return
  }

  const resizeFolderExists = fs.existsSync('images/resize')
  if (!resizeFolderExists) {
    fs.mkdirSync('images/resize')
  }
  const resizedImagePath = `images/resize/${filename}-${width}x${height}.jpg`
  const imageCacheExists = fs.existsSync(resizedImagePath)

  try {
    if (!imageCacheExists) {
      console.log('resize and serve image...')

      const imageBuffer = fs.readFileSync(`images/${filename}.jpg`)
      if (!imageBuffer) throw new Error()

      const resizedImage = resizeImage({ imageBuffer, width, height })

      resizedImage.clone().toFile(resizedImagePath, (err, info) => {
        console.log({ err, info })
      })

      const resizedImageBuffer = await resizedImage.toBuffer()

      res.set('Content-Type', 'image/jpeg')
      res.send(resizedImageBuffer)
    } else {
      console.log('serve image from cache...')

      const imageBuffer = fs.readFileSync(resizedImagePath)
      if (!imageBuffer) throw new Error()

      res.set('Content-Type', 'image/jpeg')
      res.send(imageBuffer)
    }
  } catch (err) {
    console.log(`error processing file name ${filename}`)

    res.send({
      error: `error processing file name ${filename}`,
    })
  }
})

export default images
