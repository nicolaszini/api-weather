const router = require('express').Router();
const { apiString, httpCodes } = require('../../config/baseApi');
const { returnErrors } = require('../../utils');
const { getForecast, getForecastByCity } = require('../../services/v1Services/forecastService');
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
 * @property { string } date
 * @property { string } weather
 * @property { string } description
 * @property { string } temp
 * @property { number } pressure
 * @property { number } humidity
 * @property { number } wind_speed
 */
/**
 * @typedef { object } ForecastResponse
 * @property { number } status
 * @property { Location } location
 * @property { array<Weather> } data
 */

/**
 * GET /v1/forecast/
 * @tags forecast
 * @summary READ FORECAST WEATHER DATA
 * @return { ForecastResponse } 200 - Get forecast weather data by city
 * @return { object } 404 - Forecast weather data not found
 */
 router.get('/', async (req, res) => {
  try {
    const forecast = await getForecast();
    if (!forecast) {
      res.status(httpCodes.HTTP_NOT_FOUND).json({
        error: apiString.NOT_FOUND,
      });
    }
    res.status(httpCodes.HTTP_OK).json({ status: httpCodes.HTTP_OK, location: forecast.location, data: forecast.data });
  } catch (err) {
    returnErrors(res, err);
  }
});

/**
 * GET /v1/forecast/{city}
 * @tags forecast
 * @summary READ FORECAST WEATHER DATA BY CITY
 * @param { string } city.path.required
 * @return { ForecastResponse } 200 - Get forecast weather data by city
 * @return { object } 404 - Forecast weather data by city not found
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
      const forecast = await getForecastByCity(lat, lon, location.data[0]);
      if (!forecast) {
        res.status(httpCodes.HTTP_NOT_FOUND).json({
          error: apiString.NOT_FOUND,
        });
      }
      res.status(httpCodes.HTTP_OK).json({ status: httpCodes.HTTP_OK, location: forecast.location, data: forecast.data });
    }
  } catch (err) {
    returnErrors(res, err);
  }
});

module.exports = router;