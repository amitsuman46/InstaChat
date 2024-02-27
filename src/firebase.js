// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFBZvRfSK8ukiqJ9mQ0A8EFvIyXVM6HKc",
  authDomain: "instachat-151c6.firebaseapp.com",
  projectId: "instachat-151c6",
  storageBucket: "instachat-151c6.appspot.com",
  messagingSenderId: "170162126860",
  appId: "1:170162126860:web:bc46de8b9ad120f9372e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth using getAuth function

export { auth }; // Export the initialized auth instance

export default app;