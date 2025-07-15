const express = require('express');
const router = express.Router();
const dgController = require('../Controllers/Dgcontroller');

router.post('/', dgController.createDG);
router.get('/', dgController.getAllDGs);
router.post('/:dg_id/telemetry', dgController.addTelemetry);
router.get('/:dg_id/gettelemetry', dgController.gettelemetrydata);
router.get('/telemetry/latest', dgController.getLatestTelemetry);

module.exports = router;
