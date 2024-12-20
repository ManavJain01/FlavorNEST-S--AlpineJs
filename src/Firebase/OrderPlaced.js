import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

export default function firebaseUserDetailFetch() {
  return {
    orders: [],
    userDetails: null,
    uid: localStorage.getItem("authToken"), // User UID from localStorage
    async saveOrder() {
      // Importing My Store
      const myStore = Alpine.store("applicationStore");

      // Your Firebase configuration
      const firebaseConfig = myStore().firebaseConfig;
      const app = await initializeApp(firebaseConfig);
      const db = await getFirestore(app);
      
      // Order Details
      const orderDetails = JSON.parse(localStorage.getItem("cart"));
      const orderId = "order_" + Date.now();

      try {
        // Save the order to Firestore
        const docRef = await addDoc(collection(db, "orders"), {
          items: orderDetails,
          status: "active_orders", // Set the initial status of the order
          orderId: orderId,
          uid: this.uid,
          placed_at: new Date(),
          updated_at: new Date()
        });

        console.log("Order saved successfully with ID:", docRef.id);

        // Clear localStorage to prevent duplicate saves
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
  };
}
