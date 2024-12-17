import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

export default function firebaseUserDetailFetch() {
  return {
    orders: [],
    userDetails: null,

    // Assuming accessToken is stored somewhere, like in localStorage
    uid: localStorage.getItem("authToken"),
    async fetchUserdetails() {
      try {
        if (!this.uid) {
          console.error("User UID is missing.");
          return;
        }
        const myStore = Alpine.store("applicationStore");
        const firebaseConfig = myStore().firebaseConfig;
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        // Query to get user details from Firestore
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", this.uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // Get the first matching user (assuming UID is unique)
          this.userDetails = querySnapshot.docs[0].data();
          console.log("User Details: ", this.userDetails);
        } else {
          console.log("No user found with the given UID.");
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    },

    // Fetch orders based on UID
    async fetchOrders() {
      try {
        if (!this.uid) {
          console.error("User UID is missing.");
          return;
        }

        // Query to get orders from Firestore for the specific user
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, where("user_id", "==", this.uid));
        const querySnapshot = await getDocs(ordersQuery);

        if (!querySnapshot.empty) {
          // Map through the orders and store them
          this.orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Orders: ", this.orders);
        } else {
          console.log("No orders found for this user.");
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
  };
}
