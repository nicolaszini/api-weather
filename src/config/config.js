require('dotenv').config();


module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',    
  port: process.env.PORT || 3000,
  ap_api_url: process.env.IP_API_URL,
  location_fields: '?fields=status,countryCode,regionName,city,lat,lon,query',
  openweather_url: process.env.OPENWEATHER_URL + 'data/2.5/',
  openweather_key: process.env.OPENWEATHER_KEY,
  openweather_geo_url: process.env.OPENWEATHER_URL + 'geo/1.0/',
}