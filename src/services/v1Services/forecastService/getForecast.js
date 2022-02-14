const { getLocationBase, getForecastBase, refactorWeatherForecast } = require('../../baseService');

module.exports = async function getForecast() {
    const location = await getLocationBase();
    const { lat, lon } = location.data;
    const query = `lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alert`;
    const weather = await getForecastBase(query);
    return { data : refactorWeatherForecast(weather.data), location: location.data};
};