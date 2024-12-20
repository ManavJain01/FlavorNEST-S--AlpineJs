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
      const myStore = Alpine.store("applicationStore");
      console.log("uid : ....", this.uid);

      // Your Firebase configuration
      const firebaseConfig = myStore().firebaseConfig;
      const app = await initializeApp(firebaseConfig);
      const db = await getFirestore(app);
      const product = localStorage.getItem("productCard");
      console.log(product);
      const orderDetails = JSON.parse(product);
      try {
        // Save the order to Firestore
        const docRef = await addDoc(collection(db, "orders"), {
          ...orderDetails,
          status: "active_order", // Set the initial status of the order
          placed_at: new Date(),
          updated_at: new Date(),
          uid: this.uid,
        });

        console.log("Order saved successfully with ID:", docRef.id);

        // Clear localStorage to prevent duplicate saves
        localStorage.removeItem("productCard");
      } catch (error) {
        console.error("Error saving order:", error);
      }
    },
  };
}
