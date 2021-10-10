import fs from "fs";
import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("test endpoint response", () => {
  it("should resize and save image", async (done) => {
    const response = await request.get(
      "/api/images?filename=santamonica&width=500&height=300"
    );
    expect(response.status).toBe(200);

    done();
  });

  it("should load existing image", (done) => {
    const imageCacheExists = fs.existsSync(
      "images/resize/santamonica-resize.jpg"
    );
    expect(imageCacheExists).toBe(true);

    done();
  });
});
