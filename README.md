#### Image Processing API

> In this project, I will create an API for image processing that will allow the user to visit a URL, and resize the image based on the parameters provided. When you view an image that has already been resized, a cached image will be served. This is the main functionality of placeholder image websites, and it can be combined with a frontend to serve sized images based on user input.

#### Stack

* [Node.js](https://github.com/nodejs/node)
* [Express](https://github.com/expressjs/express)
* [Typescript](https://github.com/microsoft/TypeScript)
* [Jasmine](https://github.com/jasmine/jasmine)

#### Commands

Clone the project:

```shell
$ git clone git@github.com:trunglive/image-processing-api-project.git
```

Running locally:

```shell
$ cd image-processing-api-project
$ git switch develop
$ npm install
$ npm start
```

Testing:

```shell
#  compile to JS code & run test
npm run test
```

Linting:

```shell
# run ESLint
npm run lint

# run Prettier
yarn run prettier
```

#### API Endpoints

List of available routes:

`GET /` - homepage\
`GET /api/` - main api route\
`GET /api/images?filename=:filename&width=:width&height=:height` - resize image\

#### Contributor

Trung Vo ([trunglive](https://github.com/trunglive))

#### License

This project is licensed under the MIT License. Please check the `LICENSE` file.
