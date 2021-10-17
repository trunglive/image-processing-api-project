import fs from 'fs'
import supertest from 'supertest'
import app from '../index'
import { resizeImage } from '../utils/processImage'

const request = supertest(app)

describe('test image processing api', () => {
  it('should return success for image processing api', async (done) => {
    const response = await request.get('/api/images?filename=santamonica&width=500&height=300')

    expect(response.status).toBe(200)

    done()
  })

  it('should create resized image with correct width/height/format', async (done) => {
    const imageBuffer = fs.readFileSync(`images/fjord.jpg`)

    const width = 400
    const height = 300
    const resizedImage = resizeImage({ imageBuffer, width, height })

    const { info } = await resizedImage.toBuffer({ resolveWithObject: true })

    expect(info.width).toEqual(width)
    expect(info.height).toEqual(height)
    expect(info.format).toContain('jpeg')

    done()
  })
})
