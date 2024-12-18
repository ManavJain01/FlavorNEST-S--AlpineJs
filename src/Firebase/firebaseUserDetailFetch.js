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
    orders: [],
    userDetails: null,
    uid: localStorage.getItem("authToken"), // User UID from localStorage

    async fetchUserdetails() {
      try {
        const myStore = Alpine.store("applicationStore");
        console.log("uid : ....", this.uid);

        // Your Firebase configuration
        const firebaseConfig = myStore().firebaseConfig;
        const app = await initializeApp(firebaseConfig);
        const db = await getFirestore(app);
        const userRef = await collection(db, "users");
        const querySnapshot = await getDocs(userRef);

        if (!querySnapshot.empty) {
          // Assuming UID is unique, use the first matching document
          // this.userDetails = querySnapshot.docs[0].data();
          const userData = querySnapshot.docs.filter(
            (user) => user.data().uid === this.uid
          );
          this.userDetails = userData[0].data();
          console.log("User Details:", this.userDetails);
        } else {
          console.log("No user found with the given UID.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    },
  };
}
