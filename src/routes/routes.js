const homePage = "/src/Pages/home/home.html";
const cartPage = "/src/Pages/cart/cart.html";
const loginPage = "/src/Pages/Login/login.htm";
const registerPage = "/src/Pages/Login/register.html";
const VendorRegistrationPage = "/src/Pages/vendor/vendor_registration.html";
const productCardPage = "/src/components/shared/productCard.html";
// Informational Pages
const careersPage = "/src/Pages/Informational pages/careers.html";
const faqsPage = "/src/Pages/Informational pages/FAQs.html";
const privacyPoliciesPage =
  "/src/Pages/Informational pages/privacy_policies.html";
const TermsAndConditionsPage =
  "/src/Pages/Informational pages/Terms_&_Conditions.html";
// User Pages
const userProfilePage = "/src/Pages/user/profile.html";
const userMyOrdersPage = "/src/Pages/user/myOrders.html";
const successPage = "/src/components/shared/success.html";

export default function router() {
  return {
    currentPage: localStorage.getItem("currentPage") || "home", // Default page is home
    productCard: JSON.parse(localStorage.getItem("productCard")) || {},

    // Function to load HTML content dynamically into the container
    async loadComponent(page) {
      try {
        // Access the store
        const myStore = Alpine.store("applicationStore");
        const isLogin = myStore().isLogin;

        // User Authentication
        if (!isLogin && (page === "user_profile" || page === "user_myorders")) {
          page = "login";
        }

        // Routing
        localStorage.setItem("currentPage", page);
        const homeContainer = this.$refs.home;
        const cartContainer = this.$refs.cart;
        const loginContainer = this.$refs.login;
        const registerContainer = this.$refs.register;
        const vendorRegistrationContainer = this.$refs.vendor_registration;
        const productCardContainer = this.$refs.productCard;
        // User's Containers
        const userProfileContainer = this.$refs.user_profile;
        const userMyOrdersContainer = this.$refs.user_myorders;
        // Informational Page's Containers
        const careersContainer = this.$refs.careers;
        const faqsContainer = this.$refs.faqs;
        const privacyPoliciesContainer = this.$refs.privacy_policies;
        const TermsAndConditionsContainer = this.$refs.terms_conditions;
        const successContainer = this.$refs.success;

        const pagePath =
          page === "cart"
            ? cartPage
            : page === "login"
            ? loginPage
            : page === "register"
            ? registerPage
            : page === "productCard"
            ? productCardPage
            : page === "vendor_registration"
            ? VendorRegistrationPage
            : page === "user_profile"
            ? userProfilePage
            : page === "user_myorders"
            ? userMyOrdersPage
            : page === "careers"
            ? careersPage
            : page === "faqs"
            ? faqsPage
            : page === "privacy_policies"
            ? privacyPoliciesPage
            : page === "terms_conditions"
            ? TermsAndConditionsPage
            : page === "success"
            ? successPage
            : homePage;
        const res = await fetch(pagePath);
        const html = await res.text();

        if (page === "home") {
          homeContainer.innerHTML = html;
        } else if (page === "cart") {
          cartContainer.innerHTML = html;
        } else if (page === "login") {
          loginContainer.innerHTML = html;
        } else if (page === "register") {
          registerContainer.innerHTML = html;
        } else if (page === "vendor_registration") {
          vendorRegistrationContainer.innerHTML = html;
        } else if (page === "productCard") {
          productCardContainer.innerHTML = html;
        } else if (page === "user_profile") {
          userProfileContainer.innerHTML = html;
        } else if (page === "user_myorders") {
          userMyOrdersContainer.innerHTML = html;
        } else if (page === "careers") {
          careersContainer.innerHTML = html;
        } else if (page === "faqs") {
          faqsContainer.innerHTML = html;
        } else if (page === "privacy_policies") {
          privacyPoliciesContainer.innerHTML = html;
        } else if (page === "terms_conditions") {
          TermsAndConditionsContainer.innerHTML = html;
        } else if (page === "success") {
          successContainer.innerHTML = html;
        }
      } catch (error) {
        console.error("Error loading component:", error);
      }
    },

    init() {
      // Initially load the home page
      this.loadComponent(this.currentPage);
      // Watch for changes in currentPage and load the appropriate component
      this.$watch("currentPage", (value) => {
        this.loadComponent(value);
      });
    },

    viewProduct(product) {
      localStorage.setItem("productCard", JSON.stringify(product));
      this.productCard = product;
      this.currentPage = "productCard"; // Change page to productCard
      const myStore = Alpine.store('applicationStore');
      myStore().searchedItems = [];
      window.location.reload();
    },
  };
}
