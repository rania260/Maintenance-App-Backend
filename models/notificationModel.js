// notificationModel.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the user who sent the demand
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the admin who will receive the notification
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
