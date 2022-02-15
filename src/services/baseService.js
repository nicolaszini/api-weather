const axios = require('axios');
const config = require('../config/config');

const getLocationBase = async function() {
  return await axios.get(config.ap_api_url + config.location_fields);
};

const getLocationByCity = async function(city) {
  return await axios.get(`${config.openweather_geo_url}direct?q=${city}&limit=1&appid=${config.openweather_key}`);
};

const getCurrentBase = async function(query) {
  return await axios.get(`${config.openweather_url}weather?${query}&appid=${config.openweather_key}&units=metric`);
};

const getForecastBase = async function(query) {
  return await axios.get(`${config.openweather_url}onecall?${query}&appid=${config.openweather_key}&units=metric`);
};

const refactorWeather = (data) => {
  return {
    weather: data.weather[0].main,
    description: data.weather[0].description,
    temp: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: data.visibility,
    wind_speed: data.wind.speed,
  };
};

const refactorWeatherForecast = (data, days = 5) => {
  let dataResponse = [];
  for (let day=1; day<days; day++) {
    var { dt, weather, temp, pressure, humidity, wind_speed} = data.daily[day];
    var date = new Date((dt)*1000);
    dataResponse.push({
      date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
      weather: weather[0].main,
      description: weather[0].description,
      temp: temp,
      pressure: pressure,
      humidity: humidity,
      wind_speed: wind_speed,
    });
  }
  return dataResponse;
};

module.exports = { getLocationBase, getCurrentBase, refactorWeather, getLocationByCity, getForecastBase, refactorWeatherForecast };