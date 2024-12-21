export default function initFnContainer() {
  return {
    async init(){
      const myStore = Alpine.store('applicationStore');

      const dataWithExpiry = JSON.parse(localStorage.getItem("cart"));

      // ----------------------------------------------------------------------------------------------------------
      // For routes.js
        // Importing necessary variables and functions
      const initializeRoute = myStore().initializeRoute;
      console.log(initializeRoute);
      
        // Initially load the home page
      initializeRoute();
      // ----------------------------------------------------------------------------------------------------------
    }
  }
}