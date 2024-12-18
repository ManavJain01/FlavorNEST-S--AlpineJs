import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

export default function firebaseUserDetailFetch() {
  return {
    userDetails: null,
    uid: localStorage.getItem("authToken"), // User UID from localStorage

    async fetchUserdetails() {
      try {
        const myStore = Alpine.store("applicationStore");

        // Your Firebase configuration
        const firebaseConfig = myStore().firebaseConfig;
        const app = await initializeApp(firebaseConfig);
        const db = await getFirestore(app);
        const userRef = await collection(db, "users");
        const querySnapshot = await getDocs(userRef);

        if (!querySnapshot.empty) {
          //Filtering the user details based on the uid
          const userData = querySnapshot.docs.filter(
            (user) => user.data().uid === this.uid
          );
          this.userDetails = userData[0].data();
        } else {
          console.log("No user found with the given UID.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    },

    // Fetch orders based on UID
    async fetchOrders() {
      try {
        const myStore = Alpine.store("applicationStore");
        const firebaseConfig = myStore().firebaseConfig;
        
        // Initialize Firebase app and Firestore
        const app = await initializeApp(firebaseConfig);
        const db = await getFirestore(app);
        
        // Query to get orders from Firestore for the specific user
        const ordersRef = await collection(db, "orders");
        const ordersQuery = await query(
          ordersRef,
          await where("uid", "==", this.uid)
        );

        const querySnapshot = await getDocs(ordersQuery);

        if (!querySnapshot.empty) {
          const orders = await querySnapshot.docs.map((doc) => ({
            id: doc.id, // Firestore document ID
            ...doc.data(), // Firestore document data
          }));

          console.log("orders: ", orders);
          return orders;
        }
        return [];
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
  };
}
