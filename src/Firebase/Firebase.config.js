// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqT5fOTBSQwavWkI_5rZnwtmFVyBSRICU",
  authDomain: "login-email-password-d19e3.firebaseapp.com",
  projectId: "login-email-password-d19e3",
  storageBucket: "login-email-password-d19e3.appspot.com",
  messagingSenderId: "811684225405",
  appId: "1:811684225405:web:d67f48554b337655342c14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;