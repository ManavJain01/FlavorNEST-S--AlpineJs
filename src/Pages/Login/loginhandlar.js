export default function loginHandler() {  
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

    async sendOtp() {
      if (!this.identifier) {
        alert("Please enter your phone number.");

        return;
      }
      const phoneNumber = "+91 " + this.identifier.slice(0, 4) + " " + this.identifier.slice(4, 7) + " " + this.identifier.slice(7, 10);
        
      // Access the store
      const myStore = Alpine.store('applicationStore');

      // Simulate an API call to send OTP
      await myStore().loginUserViaPhone(phoneNumber);
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
