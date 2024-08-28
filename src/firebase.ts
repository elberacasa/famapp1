// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFyyJhfvVzxJCwj19MMWUJl3D3KrQOeAs",
  authDomain: "famapp-fe972.firebaseapp.com",
  projectId: "famapp-fe972",
  storageBucket: "famapp-fe972.appspot.com",
  messagingSenderId: "58811404891",
  appId: "1:58811404891:web:270b40e977cf1c2540e57e",
  measurementId: "G-NQHM9F4F2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const signOut = () => {
  return firebaseSignOut(auth);
};

export { auth, signInWithGoogle, signOut };