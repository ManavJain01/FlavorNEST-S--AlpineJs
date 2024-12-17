export default function stripePay() {
  return {
    link: "",
    async getProductForPayment() {
      // const myStore = Alpine.store("applicationStore");

      let cart = localStorage.getItem("cart");
      cart = JSON.parse(cart);

      const product = cart[0];
      console.log(product);

      if (product.item === "Special Thali") {
        this.link = "https://buy.stripe.com/test_fZe4ip9fubjb2aYeUU";
      }
      console.log("Link : .", this.link);

      await this.makePayment();
    },
    async makePayment() {
      try {
        localStorage.setItem("currentPage", "success");
        window.location.reload();
        const stripeCheckoutUrl = this.link;
        console.log("url--", stripeCheckoutUrl);
        window.location.href = stripeCheckoutUrl;

        console.log("Redirecting to Stripe Checkout...");
      } catch (error) {
        console.error("Payment error:", error.message);
      }
    },
  };
}
