
// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_hgUSW54tlvkD2dylXvmycm3z8JLL9H4",
  authDomain: "the-bull-delivery.firebaseapp.com",
  projectId: "the-bull-delivery",
  storageBucket: "the-bull-delivery.firebasestorage.app",
  messagingSenderId: "441728297481",
  appId: "1:441728297481:web:4874bb9abfdf63811de6d8",
  measurementId: "G-JVD9R1QEH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth; // Make it globally accessible
