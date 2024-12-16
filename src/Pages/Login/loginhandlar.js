// import registerHandler from "../../Firebase/firebaseauth";
// const authentication = registerHandler();
// console.log(authentication);

document.addEventListener("DOMContentLoaded", () => {
  const mainentry = document.getElementById("meriId");
  console.log(mainentry);

  if (mainentry && mainentry.__x) {
    const alpineData = mainentry.__x.$data;
    console.log(alpineData);
    // Now you can safely call functions or access properties
  } else {
    console.error("Alpine.js component is not initialized yet.");
  }
});

function loginHandler() {
  return {
    identifier: "",
    password: "",
    otp: "",
    otpSent: false, // Track whether OTP is sent
    isEmail: true, // Determine if input is email
    darkMode: false, // Example for dark mode toggle

    // Check whether the input is an email or phone
    checkInputType() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmail = emailRegex.test(this.identifier);
      console.log("Value in input field : ", this.identifier);
    },

    // Simulate sending OTP

    sendOtp() {
      if (!this.identifier) {
        alert("Please enter your phone number.");

        return;
      }
      const phoneNumber = "+91 " + this.identifier;
      // Simulate an API call to send OTP
      authentication.loginUserViaPhone(phoneNumber);
      console.log(`Sending OTP to ${this.identifier}`);
      setTimeout(() => {
        this.otpSent = true; // OTP sent successfully
        alert("OTP sent successfully!");
      }, 1000);
    },

    // Handle login functionality
    login() {
      if (!this.identifier) {
        alert("Please enter your email or phone number.");
        return;
      }

      if (this.isEmail && !this.password) {
        alert("Please enter your password.");
        return;
      }

      if (!this.isEmail && this.otpSent && !this.otp) {
        alert("Please enter the OTP.");
        return;
      }

      // Perform login logic (e.g., call your API)
      if (this.isEmail) {
        console.log(
          `Logging in with email: ${this.identifier} and password: ${this.password}`
        );
      } else {
        console.log(
          `Logging in with phone: ${this.identifier} and OTP: ${this.otp}`
        );
      }
    },
  };
}
