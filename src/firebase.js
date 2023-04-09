// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBAcs-V0rgb1aw1pRnm3IcryMhcMG91jY",
  authDomain: "shop-cong-nghe.firebaseapp.com",
  projectId: "shop-cong-nghe",
  storageBucket: "shop-cong-nghe.appspot.com",
  messagingSenderId: "287041677073",
  appId: "1:287041677073:web:d84a35de941d983b724eb0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
export const currentUser = auth.currentUser;
