// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7rwFWfZMjDw-3H6Ll8d-4o87gFy_I1pk",
    authDomain: "reel-legends.firebaseapp.com",
    projectId: "reel-legends",
    storageBucket: "reel-legends.appspot.com",
    messagingSenderId: "1048129635614",
    appId: "1:1048129635614:web:c8c419ab109142f069750f",
    measurementId: "G-TYMBX2LHT0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

// const analytics = getAnalytics(app);
