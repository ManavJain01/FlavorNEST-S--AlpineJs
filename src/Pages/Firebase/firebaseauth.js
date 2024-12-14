// src/Pages/Firebase/firebaseauth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_nYH23XJB6YS-DdRDepPiQ8azY9rGYRg",
  authDomain: "foodnests-db.firebaseapp.com",
  projectId: "foodnests-db",
  storageBucket: "foodnests-db.firebasestorage.app",
  messagingSenderId: "1009676022229",
  appId: "1:1009676022229:web:0032add8ea38e099b84d5c",
  measurementId: "G-D1ZMDGLV1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define the Alpine.js data for register
document.addEventListener("alpine:init", () => {
  console.log("working.....firebaseAuth");

  Alpine.data("registerHandler", () => ({
    name: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
    message: "",

    async registerUser(props) {
      try {
        // Validate inputs
        console.log(props);

        if (!this.name || !this.phone || !this.email || !this.password) {
          this.message = "All fields are required.";
          return;
        }

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Show success message
        this.message = `Welcome, ${this.name}! Your account has been created.`;
        console.log("User registered:", user);
      } catch (error) {
        this.message = error.message;
        console.error("Error registering user:", error);
      }
    },
  }));
});
