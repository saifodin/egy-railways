import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX3yA25z9bC9JGj3eIvStJrqH5Wjfctyk",
  authDomain: "railways-8c365.firebaseapp.com",
  projectId: "railways-8c365",
  storageBucket: "railways-8c365.appspot.com",
  messagingSenderId: "154162063219",
  appId: "1:154162063219:web:febe7c00c8a8b402e04706",
  measurementId: "G-KCZ38J0KRF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db
