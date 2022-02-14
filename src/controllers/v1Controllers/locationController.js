const router = require('express').Router();
const { apiString, httpCodes} = require('../../config/baseApi');
const { returnErrors } = require('../../utils');
const { getLocation } = require('../../services/v1Services/locationService');

/**
 * @typedef { object } Location
 * @property { string } status
 * @property { string } countryCode
 * @property { string } regionName
 * @property { string } city
 * @property { number } lat
 * @property { number } lon
 * @property { string } query
 */
/**
 * @typedef { object } LocationResponse
 * @property { number } status
 * @property { Location } data
 */

/**
 * GET /v1/location/
 * @tags location
 * @summary READ LOCATION WITH IP-API
 * @return { LocationResponse } 200 - Get location
 * @return { object } 404 - Location not found
 */
 router.get('/', async (req, res) => {
  try {
    const location = await getLocation();
    if (!location) {
      res.status(httpCodes.HTTP_NOT_FOUND).json({
        error: apiString.NOT_FOUND,
      });
    }
    const status = location.data.status === 'fail' ? httpCodes.HTTP_INVALID_REQUEST : httpCodes.HTTP_OK;
    res.status(httpCodes.HTTP_OK).json({ status: status, data: location.data });
  } catch (err) {
    returnErrors(res, err);
  }
});

module.exports = router;