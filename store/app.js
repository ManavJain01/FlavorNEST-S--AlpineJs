function router() {
  return {
    currentView: "home", // Default view
    init() {
      // Optional: Handle browser back/forward buttons
      window.addEventListener("popstate", (event) => {
        if (event.state && event.state.view) {
          this.currentView = event.state.view;
        }
      });
    },
    // Optional: Method to update URL without page reload
    updateUrl() {
      history.pushState({ view: this.currentView }, "", `#${this.currentView}`);
    },
  };
}
