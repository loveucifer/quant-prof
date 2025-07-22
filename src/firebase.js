import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAlXKZwlY7rmh6axhn88qZZZ6yEB8yRyY",
  authDomain: "quantprof-backend.firebaseapp.com",
  projectId: "quantprof-backend",
  storageBucket: "quantprof-backend.firebasestorage.app",
  messagingSenderId: "936262037997",
  appId: "1:936262037997:web:7dc15c37de8062ef6a77e4",
  measurementId: "G-3WGJVNSETB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services you'll need
export const auth = getAuth(app);
export const db = getFirestore(app);