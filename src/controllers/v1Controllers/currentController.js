const router = require('express').Router();
const { apiString, httpCodes } = require('../../config/baseApi');
const { returnErrors } = require('../../utils');
const { getCurrent, getCurrentByCity } = require('../../services/v1Services/currentService');
const { getLocationByCity } = require('../../services/baseService');

/**
 * @typedef { object } Location
 * @property { string } status
 * @property { string } countryCode
 * @property { string } regionName
 * @property { string } cit
 * @property { number } lat
 * @property { number } lon
 * @property { string } query
 */
/**
 * @typedef { object } Weather
 * @property { string } weather
 * @property { string } description
 * @property { number } temp
 * @property { number } pressure
 * @property { number } humidity
 * @property { number } visibility
 * @property { number } wind_speed
 */
/**
 * @typedef { object } CurrentrResponse
 * @property { number } status
 * @property { Location } location
 * @property { Weather } data
 */

/**
 * GET /v1/current/
 * @tags current
 * @summary READ CURRENT WEATHER DATA
 * @return { CurrentrResponse } 200 - Get current weather data by city
 * @return { object } 404 - Current weather data not found
 */
 router.get('/', async (req, res) => {
  try {
    const current = await getCurrent();
    if (!current) {
      res.status(httpCodes.HTTP_NOT_FOUND).json({
        error: apiString.NOT_FOUND,
      });
    }
    res.status(httpCodes.HTTP_OK).json({ status: httpCodes.HTTP_OK, location: current.location, data: current.data });
  } catch (err) {
    returnErrors(res, err);
  }
});

/**
 * GET /v1/current/{city}
 * @tags current
 * @summary READ CURRENT WEATHER DATA BY CITY
 * @param { string } city.path.required
 * @return { CurrentResponse } 200 - Get current weather data by city
 * @return { object } 404 - Current weather data by city not found
 */
 router.get('/:city', async (req, res) => {
  try {
    const location = await getLocationByCity(req.params.city);
    if (!location.data.length) {
      res.status(httpCodes.HTTP_INVALID_REQUEST).json({
        status: httpCodes.HTTP_INVALID_REQUEST, 
        error: apiString.INVALID_CITY,
      });
    } else {
      const { lat, lon } = location.data[0];
      const current = await getCurrentByCity(lat, lon, location.data[0]);
      if (!current) {
        res.status(httpCodes.HTTP_NOT_FOUND).json({
          error: apiString.NOT_FOUND,
        });
      }
      res.status(httpCodes.HTTP_OK).json({ status: httpCodes.HTTP_OK, location: current.location, data: current.data });
    }
  } catch (err) {
    returnErrors(res, err);
  }
});

module.exports = router;