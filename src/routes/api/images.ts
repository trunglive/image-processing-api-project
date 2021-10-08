import express from "express";
import sharp from "sharp";

const images = express.Router();

images.get("/", (req, res) => {
  const { filename } = req.query;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  sharp(`images/${filename}.jpg`)
    .resize(width, height)
    .toFile(`images/resize/${filename}-resize.jpg`, (err, info) => {
      console.log({ err, info });
    });
  // res.send("images route");
});

export default images;
