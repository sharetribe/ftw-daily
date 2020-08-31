const swagger = require('express-swagger-generator');

module.exports = (app) => {
  const expressSwagger = swagger(app);

  let options = {
    swaggerDefinition: {
      info: {
        description: 'Description of HorseDeal API',
        title: 'HorseDeal',
        version: '1.0.0',
      },
      basePath: '/',
      produces: [
        'application/json'
      ],
      // schemes: ['https', 'http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'key',
          description: '',
        },
      }
    },
    basedir: __dirname,
    files: ['./routes/*.js'],
  };
  expressSwagger(options);
};
