// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE4cmOPJVF_c8rOrImE3oaOqt4-9DXShU",
  authDomain: "midhackathonproject.firebaseapp.com",
  projectId: "midhackathonproject",
  storageBucket: "midhackathonproject.firebasestorage.app",
  messagingSenderId: "247520668730",
  appId: "1:247520668730:web:23c4044f84d969e4225903",
  measurementId: "G-M24ZMXJD7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
