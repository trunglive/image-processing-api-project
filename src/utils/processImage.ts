import sharp, { Sharp } from 'sharp'

interface ResizedImage {
  imageBuffer: Buffer
  width: number
  height: number
}

export const resizeImage = ({ imageBuffer, width, height }: ResizedImage): Sharp => {
  return sharp(imageBuffer).resize({ width, height }).jpeg()
}
