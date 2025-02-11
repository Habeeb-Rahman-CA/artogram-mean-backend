const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ArtOgram API by Habeeb Rahman CA",
      version: "1.0.0",
      description:
        "ArtOgram is an artist community web application, built with Express.js and Node.js.",
    },
  },
  apis: ['./routes/*.js'],
});

module.exports = { swaggerUi, specs };
