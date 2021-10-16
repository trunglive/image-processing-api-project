import express, { Request, Response } from 'express'
import fs from 'fs'
import { resizeImage } from '../../utils/processImage'

const images = express.Router()

images.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const { filename } = req.query
    const width = Number(req.query.width)
    const height = Number(req.query.height)

    const imageCacheExists = fs.existsSync(`images/resize/${filename}-resize.jpg`)

    try {
      if (!imageCacheExists) {
        console.log('resize and serve image...')

        const imageBuffer = fs.readFileSync(`images/${filename}.jpg`)
        if (!imageBuffer) throw new Error()

        const resizedImage = resizeImage({ imageBuffer, width, height })

        resizedImage.clone().toFile(`images/resize/${filename}-resize.jpg`, (err, info) => {
          console.log({ err, info })
        })

        const resizedImageBuffer = await resizedImage.toBuffer()

        res.set('Content-Type', 'image/jpeg')
        res.send(resizedImageBuffer)
      } else {
        console.log('serve image from cache...')

        const imageBuffer = fs.readFileSync(`images/resize/${filename}-resize.jpg`)
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
  },
)

export default images
