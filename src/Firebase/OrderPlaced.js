import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

export default function firebaseUserDetailFetch() {
  return {
    orders: [],
    userDetails: null,
    uid: localStorage.getItem("authToken"), // User UID from localStorage
    async saveOrder() {
      const myStore = Alpine.store("applicationStore");
      console.log("uid : ....", this.uid);

      // Your Firebase configuration
      const firebaseConfig = myStore().firebaseConfig;
      const app = await initializeApp(firebaseConfig);
      const db = await getFirestore(app);
      const cart = localStorage.getItem("cart");
      const orderProducts = JSON.parse(cart);

      const orderId = "order_" + Date.now();
      try {
        // Save the order to Firestore
        const docRef = await doc(db, "orders", orderId);

        await setDoc(docRef, {
          items: orderProducts,
          status: "active_order", // Set the initial status of the order
          placed_at: new Date(),
          updated_at: new Date(),
          uid: this.uid,
          orderId: orderId
        });

        console.log("Order saved successfully with ID:", docRef.id);

        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
  };
}
