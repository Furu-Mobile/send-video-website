import firebase from 'firebase';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnYXhrTWhg-nv1kGY619cH6fTojk0kOvI",
  authDomain: "push-notification-7c3e3.firebaseapp.com",
  projectId: "push-notification-7c3e3",
  storageBucket: "push-notification-7c3e3.appspot.com",
  messagingSenderId: "1003647006216",
  appId: "1:1003647006216:web:6c4af366a29f026ea383bd",
  measurementId: "G-6BJDYFEF6Z"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
