const app = require('./app');
const config = require('./config/config');
require('dotenv').config();


app.listen(process.env.PORT, () => {
  console.log('server on, port: ', config.port)
});