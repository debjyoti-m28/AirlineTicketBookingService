const express = require('express');
const { BookingController } = require("../../controllers/index");
const router = express.Router();

router.post('/bookings', BookingController.create);
router.post('/publish', BookingController.sendMessageToQueue);

module.exports = router;