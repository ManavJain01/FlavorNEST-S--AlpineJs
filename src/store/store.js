export default function globalStore() {
  return {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
    cart: [],
    isLogin: localStorage.getItem("authToken") ? true : false,
    // isLogin: true,

    toggleTheme() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      // Save the theme preference to localStorage
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
    },

    setTotal() {
      return this.cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue?.price * currentValue?.quantity,
        0 // Initial value of the accumulator
      );
    },
    addToCart(product, quantity = 1) {
      let updatedProduct = this.cart.filter((item) => {
        item.name === product.name;
      });

      if (updatedProduct.length != 0) {
        updatedProduct[0].quantity = quantity;
        this.cart.push(updatedProduct[0]);
      } else {
        updatedProduct = product;
        updatedProduct.quantity = quantity;
        this.cart.push(updatedProduct);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    async userSuccessfullyLoggedIn(cache) {
      localStorage.setItem("authToken", cache);
      this.isLogin = true;
      localStorage.setItem("currentPage", "home");
      window.location.reload();
    },

    logout() {
      localStorage.removeItem("authToken");
      this.isLogin = false;
    },
  };
}
