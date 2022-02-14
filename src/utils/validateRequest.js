const { validationResult } = require('express-validator');
const baseApi = require('../config/baseApi');

const getValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    ...error,
    message: `${error.msg} (${error.param})`,
  }),
});

module.exports = function validateRequest(request, response) {
  const errors = getValidationResult(request);
  if (!errors.isEmpty()) {
    console.log(errors);
    response.status(baseApi.httpCodes.HTTP_VALIDATION_ERROR).json({
      errors: errors.array(),
    });
  }
};
