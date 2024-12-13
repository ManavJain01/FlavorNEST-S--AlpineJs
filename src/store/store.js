function globalStore() {
  return {
    darkMode: false,
    cart: [],
    user: null,

    init() {
      // Initialize dark mode from localStorage
      this.darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
      if (this.darkMode) {
        document.body.classList.add('dark');
      }

      // Load user data from localStorage or API
      this.user = JSON.parse(localStorage.getItem('user')) || null;

      // Load cart data from localStorage
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },

    toggleTheme() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }

      // Save the theme preference to localStorage
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    },

    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  };
}