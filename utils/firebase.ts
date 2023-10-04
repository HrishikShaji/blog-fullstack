// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-personal-19664.firebaseapp.com",
  projectId: "blog-personal-19664",
  storageBucket: "blog-personal-19664.appspot.com",
  messagingSenderId: "439539172972",
  appId: "1:439539172972:web:b5a852959865602132fa49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
