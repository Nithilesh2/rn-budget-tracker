import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNZWVmJovuuSp-GKn8wNLiy2Ob2jbfYTU",
  authDomain: "budget-tracker-24.firebaseapp.com",
  projectId: "budget-tracker-24",
  storageBucket: "budget-tracker-24.firebasestorage.app",
  messagingSenderId: "530748282534",
  appId: "1:530748282534:web:d7e7b0c92bd49bfac40667",
  measurementId: "G-RYG2E62KM3",
};
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, firestore, analytics, provider };
