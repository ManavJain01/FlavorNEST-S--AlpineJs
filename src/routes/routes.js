const homePage = "/src/Pages/home/home.html";
const cartPage = "/src/Pages/cart/cart.html";
const loginPage = "/src/Pages/Login/login.htm";
const registerPage = "/src/Pages/Login/register.html";
const productCardPage = "/src/components/shared/productCard.html";

document.addEventListener('alpine:init', () => {
  Alpine.data('router', () => ({
    currentPage: localStorage.getItem("currentPage") || 'home', // Default page is home
    productCard: JSON.parse(localStorage.getItem("productCard")) || {},
    
    // Function to load HTML content dynamically into the container
    async loadComponent(page) {
      try {
        localStorage.setItem("currentPage", page);
        const homeContainer = this.$refs.home;
        const cartContainer = this.$refs.cart;
        const loginContainer = this.$refs.login;
        const registerContainer = this.$refs.register;
        const productCardContainer = this.$refs.productCard;
        
        const pagePath =
        page === "cart"
          ? cartPage
          : page === "login"
          ? loginPage
          : page === "register"
          ? registerPage
          : page === 'productCard' ? productCardPage
          : homePage;
        const res = await fetch(pagePath);
        const html = await res.text();
        
        if (page === 'home') {
          homeContainer.innerHTML = html;
        } else if (page === 'cart') {
          cartContainer.innerHTML = html;
        } else if (page === "login") {
          loginContainer.innerHTML = html;
        } else if (page === "register") {
          registerContainer.innerHTML = html;
        } else if (page === 'productCard') {
          productCardContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading component:', error)
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
      this.currentPage = 'productCard'; // Change page to productCard
    },
  }));
});
