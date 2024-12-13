const homePage = "/src/Pages/home/home.html";
const cartPage = "/src/Pages/cart/cart.html";
const loginPage = "/src/Pages/Login/login.htm";
const registerPage = "/src/Pages/Login/register.html";

document.addEventListener("alpine:init", () => {

  Alpine.data("router", () => ({
    currentPage: localStorage.getItem("currentPage") || "home", // Default page is home

    // Function to load HTML content dynamically into the container
    loadComponent(page) {
      const homeContainer = this.$refs.home;
      const cartContainer = this.$refs.cart;
      const loginContainer = this.$refs.login;
      const registerContainer = this.$refs.register;
      const pagePath =
        page === "cart"
          ? cartPage
          : page === "login"
          ? loginPage
          : page === "register"
          ? registerPage
          : homePage;
      localStorage.setItem("currentPage", page);
      fetch(pagePath)
        .then((response) => response.text())
        .then((html) => {
          if (page === "home") {
            homeContainer.innerHTML = html;
          } else if (page === "cart") {
            cartContainer.innerHTML = html;
          } else if (page === "login") {
            loginContainer.innerHTML = html;
          } else if (page === "register") {
            registerContainer.innerHTML = html;
          }
        })
        .catch((error) => console.error("Error loading component:", error));
    },

    init() {
      // Initially load the home page
      this.loadComponent(this.currentPage);
      // Watch for changes in currentPage and load the appropriate component
      this.$watch("currentPage", (value) => {
        this.loadComponent(value);
      });
    },
  }));
});
