const { getForecastBase, refactorWeatherForecast } = require('../../baseService');

module.exports = async function getForecast(lat, lon, city) {
  const query = `lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alert`;
  const weather = await getForecastBase(query);
  const location = {
    status: 'success',
    countryCode: city.country,
    regionName: city.state,
    city: city.name,
    lat: lat,
    lon: lon,
    query: city.name,
  };
  return { data : refactorWeatherForecast(weather.data), location: location.data};
};