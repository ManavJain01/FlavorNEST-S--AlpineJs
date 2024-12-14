import store from "./src/store/store.js"
import routes from "./src/routes/routes.js"
import firebase from "./src/Firebase/firebaseauth.js"

import injectComponents from './src/js/component_Injection.js';

export default function mainEntry(){
  return {
    ...store(),
    ...routes(),
    ...firebase(),
    ...injectComponents()
  }
}