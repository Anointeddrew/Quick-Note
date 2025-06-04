// Must be in the public directory for FCM to detect
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAgkmqk1TWCsU0kFytUAAROhwk2mZTQpQI",
  authDomain: "quicknotes-ece70.firebaseapp.com",
  projectId: "quicknotes-ece70",
  messagingSenderId: "BL8SKtDKkym6FB8UL73ASx73LTQKkM7SU7pxfmhDQRxZv_3vAHm4509SSXzmF9UYowKJoRUM15F1fMF-8yHiSmk",
  appId: "1:1084489840909:web:8a41952d7db08bdb955844"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
