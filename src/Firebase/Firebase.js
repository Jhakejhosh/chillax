import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNs-OVEnt5jWdq_kObJRV3xo82w42w6-Q",
  authDomain: "chillax-movie-app.firebaseapp.com",
  projectId: "chillax-movie-app",
  storageBucket: "chillax-movie-app.appspot.com",
  messagingSenderId: "1043159503841",
  appId: "1:1043159503841:web:0f39d62e8ab92ff8cf78a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
