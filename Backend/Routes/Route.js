const express = require('express');
const router = express.Router();
const dgController = require('../Controllers/Dgcontroller');
const usercontroller = require('../Controllers/Usercontroller')


//user routes
router.post('/login',usercontroller.userlogin)
router.post('/register',usercontroller.userregister)



//Dg routes
router.post('/', dgController.createDG);
router.get('/', dgController.getAllDGs);
router.post('/:dg_id/telemetry', dgController.addTelemetry);
router.get('/:dg_id/gettelemetry', dgController.gettelemetrydata);
router.get('/telemetry/latest', dgController.getLatestTelemetry);

module.exports = router;
