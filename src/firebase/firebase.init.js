// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3b0cpj7KH5Z3sI2-ZQVJUc56Aut5hrz8",
  authDomain: "assignment10new.firebaseapp.com",
  projectId: "assignment10new",
  storageBucket: "assignment10new.firebasestorage.app",
  messagingSenderId: "298266104512",
  appId: "1:298266104512:web:303f02b3c3dfb009971325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);

export { auth };
