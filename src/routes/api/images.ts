import express from "express";
import sharp from "sharp";
import fs from "fs";

const images = express.Router();

images.get("/", async (req, res) => {
  const { filename } = req.query;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const imageCacheExists = fs.existsSync(
    `images/resize/${filename}-resize.jpg`
  );

  try {
    if (!imageCacheExists) {
      console.log("resize and serve image");

      const imageBuffer = await fs.readFileSync(`images/${filename}.jpg`);
      if (!imageBuffer) throw new Error();

      const resizedImage = await sharp(imageBuffer)
        .resize({ width, height })
        .jpeg();

      const resizedImageBuffer = await resizedImage.toBuffer();

      res.set("Content-Type", "image/jpeg");
      res.send(resizedImageBuffer);

      await resizedImage.toFile(
        `images/resize/${filename}-resize.jpg`,
        (err, info) => {
          console.log({ err, info });
        }
      );
    } else {
      console.log("serve image from cache");

      const imageBuffer = await fs.readFileSync(
        `images/resize/${filename}-resize.jpg`
      );
      if (!imageBuffer) throw new Error();

      res.set("Content-Type", "image/jpeg");
      res.send(imageBuffer);
    }
  } catch (e) {
    console.log(`Error processing file name ${filename}`);

    res.send({
      error: `Error processing file name ${filename}`,
    });
  }
});

export default images;
