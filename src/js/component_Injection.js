export default function injectComponents() {
  return {
    headerContent: '',
    navbarContent: '',
    footerContent: '',
    
    // Header Function
    async headerComponent() {
      try {
        const response = await fetch('./src/components/common/header.html');
        if (!response.ok) {
          throw new Error('Failed to fetch header content');
        }
        this.headerContent = await response.text();
        this.$el.innerHTML = this.headerContent;
      } catch (error) {
        console.error('Error loading header:', error);
      }
    },

    // Footer Function
    async footerComponent() {
      try {
        const response = await fetch('./src/components/common/footer.html');
        if (!response.ok) {
          throw new Error('Failed to fetch footer content');
        }
        this.footerContent = await response.text();
        this.$el.innerHTML = this.footerContent;
      } catch (error) {
        console.error('Error loading footer:', error);
      }
    },

    // Navbar Function
    async navbarComponent() {
      const response = await fetch('./src/components/common/navbar.html');
      this.navbarContent = await response.text();
    },
  }
}