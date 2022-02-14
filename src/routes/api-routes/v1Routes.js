const { Router } = require('express');
const router = Router();
const locationController = require('../../controllers/v1Controllers/locationController');
const currentController = require('../../controllers/v1Controllers/currentController');
const forecastController = require('../../controllers/v1Controllers/forecastController');

router.use('/location', locationController);
router.use('/current', currentController);
router.use('/forecast', forecastController);

module.exports = router;