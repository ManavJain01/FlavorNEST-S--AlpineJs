import store from "./src/store/store.js";
import routes from "./src/routes/routes.js";
import firebase from "./src/Firebase/firebaseauth.js";
import loginHandler from "./src/Pages/Login/loginhandlar.js";
import injectComponents from "./src/js/component_Injection.js";
import firebaseProductFetch from "./src/Firebase/firebaseProductFetch.js";
import firebaseUserDetailFetch from "./src/Firebase/firebaseUserDetailFetch.js";
import stripePay from "./src/Stripe/stripePay.js";
export default function mainEntry() {
  return {
    ...store(),
    ...routes(),
    ...firebase(),
    ...injectComponents(),
    ...firebaseProductFetch(),
    ...firebaseUserDetailFetch(),
    ...loginHandler(),
    ...stripePay(),
  };
}
