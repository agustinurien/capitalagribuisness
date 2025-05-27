import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-Dyw-I7aKtQPhW10a9n7J2aaK9wKJo1c",
  authDomain: "capital-e0fae.firebaseapp.com",
  projectId: "capital-e0fae",
  storageBucket: "capital-e0fae.firebasestorage.app",
  messagingSenderId: "141086662920",
  appId: "1:141086662920:web:dd0a8965acceaf36e98cbd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
