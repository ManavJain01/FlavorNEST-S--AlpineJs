const homePage = "/src/Pages/home/home.html";
const cartPage = "/src/Pages/cart/cart.html";

document.addEventListener('alpine:init', () => {
  Alpine.data('router', () => ({
    currentPage: 'home', // Default page is home

    // Function to load HTML content dynamically into the container
    loadComponent(page) {
      const homeContainer = this.$refs.home;
      const cartContainer = this.$refs.cart;
      const pagePath = page === 'home' ? homePage : cartPage;

      fetch(pagePath)
        .then((response) => response.text())
        .then((html) => {
          if (page === 'home') {
            homeContainer.innerHTML = html;
          } else if (page === 'cart') {
            cartContainer.innerHTML = html;
          }
        })
        .catch((error) => console.error('Error loading component:', error));
    },

    init() {
      // Initially load the home page
      this.loadComponent(this.currentPage);

      // Watch for changes in currentPage and load the appropriate component
      this.$watch('currentPage', (value) => {
        this.loadComponent(value);
      });
    },
  }));
});
