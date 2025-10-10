// // public/firebase-messaging-sw.js

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Your Firebase config (replace with your project values)
const firebaseConfig = {
  apiKey: "AIzaSyBXT9f9VFGQ2wT0LwhIdSifUv-mOm9Y0dg",
  authDomain: "e-waste-connect-8dd3b.firebaseapp.com",
  projectId: "e-waste-connect-8dd3b",
  storageBucket: "e-waste-connect-8dd3b.firebasestorage.app",
  messagingSenderId: "757955846595",
  appId: "1:757955846595:web:89120d3542c54cab97dd76",
  measurementId: "G-FNB283NQXW"
};

// Initialize Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/firebase-logo.png', // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

