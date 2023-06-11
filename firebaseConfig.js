// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import firebase from 'firebase';
// import { getAnalytics } from 'firebase/analytics';
//import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBgj6QFtQbAS60mxkQ8th5M12ztKMn29l4',
//   authDomain: 'awesome-test-52153.firebaseapp.com',
//   projectId: 'awesome-test-52153',
//   storageBucket: 'awesome-test-52153.appspot.com',
//   messagingSenderId: '379125373254',
//   appId: '1:379125373254:web:a74188aaac8c32b9e0ad47',
//   measurementId: 'G-PJ0G4B9ZDL',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyC18cMACPSiUnD5dLPn773MT8bMc5gPDNE',
  authDomain: 'auth-app-c0d41.firebaseapp.com',
  projectId: 'auth-app-c0d41',
  storageBucket: 'auth-app-c0d41.appspot.com',
  messagingSenderId: '297501883090',
  appId: '1:297501883090:web:9101760b7525e2f5914b0b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
