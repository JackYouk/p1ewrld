import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWpKfZPzWgZJJkiZo1KYb-c8WHKcwnZrg",
    authDomain: "p1e-world.firebaseapp.com",
    projectId: "p1e-world",
    storageBucket: "p1e-world.appspot.com",
    messagingSenderId: "761340991595",
    appId: "1:761340991595:web:6c053c44f6b77c6bec392e",
    measurementId: "G-ZGR9XD8XZS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

