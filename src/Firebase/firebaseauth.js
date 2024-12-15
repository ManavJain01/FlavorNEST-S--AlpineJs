import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyA_nYH23XJB6YS-DdRDepPiQ8azY9rGYRg",
  authDomain: "foodnests-db.firebaseapp.com",
  projectId: "foodnests-db",
  storageBucket: "foodnests-db.firebasestorage.app",
  messagingSenderId: "1009676022229",
  // appId: process.env.FIREBASE_APP_ID,
  appId: "1:1009676022229:web:0032add8ea38e099b84d5c",
  measurementId: "G-D1ZMDGLV1X",
};

// console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Define the Alpine.js data for register
export default function registerHandler() {
  return {
    //Register Variables

    message: "",
    recaptchaVerifier: null,
    confirmationResult: "",
    initRecaptcha() {
      // Initialize reCAPTCHA verifier
      this.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // Optional: Make it invisible
          callback: function (response) {
            console.log("reCAPTCHA verified:", response);
          },
        },
        auth
      );
    },

    async registerUser(userData) {
      try {
        const { email, password, phone, name, referralCode } = userData;

        // Validate inputs
        console.log(userData);

        if (!name || !phone || !email || !password) {
          this.message = "All fields are required.";
          return;
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          console.log("password : ", password);
          console.log("referral : ", referralCode);

          // Store user details in Firestore
          await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            phone_number: phone,
            referral_code: referralCode,
            // password: password,
            created_at: new Date(),
          });

          // window.location.href=
          localStorage.setItem("currentPage", "login");
          window.location.reload();

          // Show success message
          this.message = `Welcome, ${name}! Your account has been created.`;
          console.log("User registered:", user);
        }
      } catch (error) {
        // Create user with Firebase Auth
        this.message = error.message;
        console.error("Error registering user:", error);
      }
    },

    async loginUserViaEmailPassword(userdata) {
      try {
        const { email, password } = userdata;

        // Validate inputs
        if (!email || !password) {
          this.message = "Email and Password are required.";
          return;
        }

        // Log in user with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Show success message
        this.message = `Welcome back, ${user.email}! You are now logged in.`;
        console.log("User logged in:", user);
      } catch (error) {
        this.message = error.message;
        console.error("Error logging in user:", error);
      }
    },

    async loginUserViaPhone(userData) {
      try {
        const { phone } = userData;

        // Validate phone number
        if (!phone) {
          this.message = "Phone number is required.";
          return;
        }

        // Initialize reCAPTCHA if not done already
        if (!this.recaptchaVerifier) {
          this.initRecaptcha();
        }

        // Send OTP to phone
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phone,
          this.recaptchaVerifier
        );
        this.confirmationResult = confirmationResult;

        // Prompt user to enter OTP
        this.message =
          "OTP has been sent to your phone. Please enter it below.";
      } catch (error) {
        this.message = error.message;
        console.error("Error logging in with phone:", error);
      }
    },

    async loginAfterOtp(otp) {
      try {
        // Handle the OTP input
        const verificationCode = otp; // The OTP the user enters
        await this.confirmationResult.confirm(verificationCode);

        this.message = "Phone number successfully verified and logged in!";
      } catch (error) {
        this.message = error.message;
        console.error("Error verifying OTP:", error);
      }
    },
  };
}
