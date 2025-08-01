// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import   "firebase/compat/firestore";
import   "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMp78BHyqjXE9qai4BRtgroBy4xSfpumM",
  authDomain: "music-playlist-af52f.firebaseapp.com",
  projectId: "music-playlist-af52f",
  storageBucket: "music-playlist-af52f.firebasestorage.app",
  messagingSenderId: "362721192501",
  appId: "1:362721192501:web:d858e477521e1ff7265f7c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db=app.firestore()