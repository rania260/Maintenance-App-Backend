const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT)

router.get('/notifications', notificationController.getNotifications);

module.exports = router;