import { initializeApp } from "firebase/app";

import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBNnXs9W-XJwyleNveMzVoF1bzFZLNHJqc",
  authDomain: "saleapp-b719d.firebaseapp.com",
  projectId: "saleapp-b719d",
  storageBucket: "saleapp-b719d.appspot.com",
  messagingSenderId: "438790438934",
  appId: "1:438790438934:web:4a06892973302d81f3f537"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();