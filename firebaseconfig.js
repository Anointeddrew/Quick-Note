// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgkmqk1TWCsU0kFytUAAROhwk2mZTQpQI",
  authDomain: "quicknotes-ece70.firebaseapp.com",
  projectId: "quicknotes-ece70",
  storageBucket: "quicknotes-ece70.firebasestorage.app",
  messagingSenderId: "BL8SKtDKkym6FB8UL73ASx73LTQKkM7SU7pxfmhDQRxZv_3vAHm4509SSXzmF9UYowKJoRUM15F1fMF-8yHiSmk",
  appId: "1:1084489840909:web:8a41952d7db08bdb955844"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const messaging = getMessaging(app);

export default app;