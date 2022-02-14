const { getCurrentBase, getLocationBase, refactorWeather } = require('../../baseService');

module.exports = async function getCurrent() {
    const location = await getLocationBase();
    const { lat, lon } = location.data;
    const query = `lat=${lat}&lon=${lon}`;
    const weather = await getCurrentBase(query);
    return { data : refactorWeather(weather.data), location: location.data};
};