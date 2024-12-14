import { registerUser } from "../Firebase/firebaseauth.js";

document.addEventListener("alpine:init", () => {
  Alpine.data("registerHandler", (props) => ({
    email: "",
    password: "",
    message: "",
    async register() {
      console.log(props);

      try {
        if (!this.email || !this.password) {
          this.message = "Email and password are required!";
          return;
        }

        const user = await registerUser(this.email, this.password);
        this.message = `Welcome, ${user.email}! Registration successful.`;
      } catch (error) {
        this.message = error.message;
      }
    },
  }));
});
