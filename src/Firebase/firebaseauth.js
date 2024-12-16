import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Define the Alpine.js data for register
export default function registerHandler() {
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
  const db = getFirestore(app);

  return {
    //Register Variables
    message: "",

    // Your Firebase configuration
    firebaseConfig: {
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
      measurementId: firebaseConfig.measurementId,
    },
    recaptchaVerifier: null,
    confirmationResult: "",

    // Functions
    initRecaptcha() {
      // Initialize reCAPTCHA verifier
      this.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible", // Optional: Make it invisible
          callback: function (response) {
            console.log("reCAPTCHA verified:", response);
          },
        }
      );
    },
    // Login/Register Functions
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
        console.log("userCredential ,....", userCredential);

        // Access the store
        const myStore = Alpine.store("applicationStore");
        await myStore().userSuccessfullyLoggedIn(userCredential);

        // Show success message
        this.message = `Welcome back, ${user.email}! You are now logged in.`;
      } catch (error) {
        this.message = error.message;
        console.error("Error logging in user:", error);
      }
    },

    async loginUserViaPhone(userData) {
      console.log("userData : ", userData);
      const phone = userData.phoneNumber;
      try {
        console.log("in viaPhone:", phone);

        // Validate phone number
        if (!phone) {
          this.message = "Phone number is required.";
          return;
        }

        // Initialize reCAPTCHA
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
        console.log("confirmation !!!: ", this.confirmationResult);

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
        const userCredential = await this.confirmationResult.confirm(
          verificationCode
        );
        console.log("user credential !! : ", userCredential);

        // Successfully logged in
        const user = userCredential.user;

        // Access the store
        const myStore = Alpine.store("applicationStore");
        await myStore().userSuccessfullyLoggedIn(userCredential);

        this.message = "Phone number successfully verified and logged in!";
      } catch (error) {
        this.message = error.message;
        console.error("Error verifying OTP:", error);
      }
    },
  };
}
