export default function globalStore() {
  return {
    darkMode: false,
    cart: [],
    user: null,

    init() {
      // Initialize dark mode from localStorage
      this.darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
      if (this.darkMode) {
        document.body.classList.add("dark");
      }

      // Load user data from localStorage or API
      this.user = JSON.parse(localStorage.getItem("user")) || null;

      // Load cart data from localStorage
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },

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
      console.log("car : ", this.cart);

      const temp = this.cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue?.price * currentValue?.quantity,
        0 // Initial value of the accumulator
      );
      console.log("temp:", temp);
      return temp;
    },
    addToCart(product, quantity = 1) {
      console.log(product);

      let updatedProduct = this.cart.filter((item) => {
        item.name === product.name;
      });
      console.log("After filter function : ", updatedProduct);

      if (updatedProduct.length != 0) {
        console.log("in if block : ", updatedProduct);

        updatedProduct[0].quantity = quantity;
        this.cart.push(updatedProduct[0]);
      } else {
        console.log("in else block : ", updatedProduct);
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

    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  };
}
