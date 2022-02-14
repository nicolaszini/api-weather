const baseApi = require('../config/baseApi');

module.exports = function returnErrors(response, error) {
  console.log(error);
  response.status(baseApi.httpCodes.HTTP_SERVER_ERROR).json({
    errors: [{ message: error.message }],
  });
};
