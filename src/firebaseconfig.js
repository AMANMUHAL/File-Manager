// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZNucBWxA1BpzbF5JiKoVD8TxKdqmg8qk",
  authDomain: "signup-d9eae.firebaseapp.com",
  projectId: "signup-d9eae",
  storageBucket: "signup-d9eae.appspot.com",
  messagingSenderId: "169307413117",
  appId: "1:169307413117:web:8ceda37531dacb2c0faf14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app ,auth }; 