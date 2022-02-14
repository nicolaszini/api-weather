const {Router} = require('express');
const router = Router();
const v1Routes = require('./api-routes/v1Routes');

router.use('/v1', v1Routes);

module.exports = router;