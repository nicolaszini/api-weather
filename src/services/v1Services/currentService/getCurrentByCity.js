const { getCurrentBase, refactorWeather } = require('../../baseService');

module.exports = async function getCurrentByCity(lat, lon, city) {
  const query = `lat=${lat}&lon=${lon}`;
  const weather = await getCurrentBase(query);
  const location = {
    status: 'success',
    countryCode: city.country,
    regionName: city.state,
    city: city.name,
    lat: lat,
    lon: lon,
    query: city.name,
  };
  return { data : refactorWeather(weather.data), location: location};
};