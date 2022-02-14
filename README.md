# api-weather

## Requirements
- node js
- npm
- git
- docker (opcional)

## Installation
1. ```git clone https://github.com/nicolaszini/api-weather.git```
2. Copy and rename file ```.env.example >> .env``` manually or run
```cp .env.example .env```
3. ```npm install```
4. ```npm run serve```

## Installation with Docker
1. ```docker build -t api-weather .```
2. ```docker run -it -p 4000:3000 api-weather```

## How to test
Check the swagger in the link ```{baseURL}/api-docs```
E.g.
- by npm run serve >> ```localhost:3000/api-docs```
- by docker >> ```localhost:4000/api-docs``` (4000 or your port)

### Run tests
Run in console
```npm run test```

### Endpoints
- Base path ```{baseURL}/v1```

- ```/v1/location``` return location with ip-api
- ```/v1/current/:city``` (City is not required) return current location or location data city and current weather. 
- ```/v1/forecast/:city``` (City is not required) return current location or location data city and 5-days weather. 
- ```/api-docs``` api documentation - swagger 
