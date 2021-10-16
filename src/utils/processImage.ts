import sharp from 'sharp'

interface ResizedImage {
  imageBuffer: Buffer
  width: number
  height: number
}

export const resizeImage = ({ imageBuffer, width, height }: ResizedImage) => {
  return sharp(imageBuffer).resize({ width, height }).jpeg()
}
