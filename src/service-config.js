const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const jobs = require('./routes/jobs');
const errorHandler  = require('./error-handler');

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jobby API',
      version: '1.0.0',
      description:
        'Dummy API that will let me experiment with frontend frameworks',
    },
  },
  apis: ['./src/routes/*.js'],
});

module.exports = (app, path = '') => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  app.use(`${path}/jobs`, jobs);
  app.use(errorHandler);
  return app;
};
