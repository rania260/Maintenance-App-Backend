import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');
    console.log(socket)
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('newNotification', (notification) => {
      console.log('New notification received:', notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.disconnect(); // Clean up on component unmount
    };
  }, []);

  const sendNotification = () => {
    const notification = { message: 'This is a new notification' }
    console.log("click on button")
    const socket = io('http://localhost:5000');
    socket.emit('sendNotification', notification);
  };

  return (
    <div style={{ background: '#f4f6f6' }}>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
      <button style={{ background: 'red' }} onClick={sendNotification}>
        Send Notification
      </button>
    </div>
  );
}

export default NotificationComponent;
