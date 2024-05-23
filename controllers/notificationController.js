// notificationController.js

const Notification = require('../models/notificationModel');

const getNotifications = async (req, res) => {
  try {
    // Find all notifications and populate sender and receiver fields with firstname
    const notifications = await Notification.find()
      .populate('sender', 'firstname')
      .populate('receiver', 'firstname')
      .exec();

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports ={
    getNotifications
}