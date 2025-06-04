import { messaging } from '../firebaseconfig';
import { getToken } from 'firebase/messaging';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: "BL8SKtDKkym6FB8UL73ASx73LTQKkM7SU7pxfmhDQRxZv_3vAHm4509SSXzmF9UYowKJoRUM15F1fMF-8yHiSmk",
      });

      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // You can store this token in Firestore under the user's profile
      } else {
        console.warn('No registration token available');
      }
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};


