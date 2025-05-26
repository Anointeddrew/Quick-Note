// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgkmqk1TWCsU0kFytUAAROhwk2mZTQpQI",
  authDomain: "quicknotes-ece70.firebaseapp.com",
  projectId: "quicknotes-ece70",
  storageBucket: "quicknotes-ece70.firebasestorage.app",
  messagingSenderId: "1084489840909",
  appId: "1:1084489840909:web:8a41952d7db08bdb955844"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;