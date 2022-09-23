import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiIRrgrS2_yci40vQLWEWiAkhJQNUCmOY",
  authDomain: "waldo-229f6.firebaseapp.com",
  projectId: "waldo-229f6",
  storageBucket: "waldo-229f6.appspot.com",
  messagingSenderId: "1088474571932",
  appId: "1:1088474571932:web:31d59db17f103c419e3959"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();