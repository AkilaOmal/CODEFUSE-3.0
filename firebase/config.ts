// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiJOumhp4nmbOjL54PkWM8ZhbpLXdHDvI",
  authDomain: "codefuse-69919.firebaseapp.com",
  projectId: "codefuse-69919",
  storageBucket: "codefuse-69919.firebasestorage.app",
  messagingSenderId: "150033150198",
  appId: "1:150033150198:web:7986547c12fad337a4fcd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
