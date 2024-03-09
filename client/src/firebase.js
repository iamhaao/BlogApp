// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmfcJXsW0h1rAtXwnINWRSpQNDz8hVitk",
  authDomain: "blogapp-326e0.firebaseapp.com",
  projectId: "blogapp-326e0",
  storageBucket: "blogapp-326e0.appspot.com",
  messagingSenderId: "900973796389",
  appId: "1:900973796389:web:ebc4d4cb558d58915173cc",
  measurementId: "G-CLXNVXJTY8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
