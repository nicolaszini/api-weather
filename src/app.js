require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const cors = require('cors');

app.use(cors({ credentials: true, origin: true }));

const options = {
  info: {
    version: '1.0.0',
    title: 'api-weather',
    description: `API WEATHER by NICOLAS ZINI<br>
      This API returns: <br>
      - Location by ip. <br>
      - Current weather of your location or a city. <br>
      - 5 days weather of your location or a city.`,
  },
  filesPattern: './**/*Controller.js',
  baseDir: __dirname,
  exposeSwaggerUI: true, // Expose OpenAPI UI. Default true
  exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
};

expressJSDocSwagger(app)(options);

app.use('/', apiRouter);

module.exports = app;