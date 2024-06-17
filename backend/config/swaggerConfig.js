const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SWAGGER_API_TITLE,
      version: process.env.SWAGGER_API_VERSION,
      description: process.env.SWAGGER_API_DESCRIPTION,
    },
    servers: [
      {
        url: `${process.env.SWAGGER_API_SCHEME}://${process.env.SWAGGER_API_HOST}${process.env.SWAGGER_API_BASEPATH}`,
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
