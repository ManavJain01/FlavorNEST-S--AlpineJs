// Header Function
function headerComponent() {
  return {
    headerContent: '',
    async loadHeader() {
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
  };
}

// Footer Function
function footerComponent() {
  return {
    footerContent: '',
    async loadFooter() {
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
  };
}

function navbarLoader() {
  return {
    navbarContent: '',
    async fetchNavbar() {
      const response = await fetch('./src/components/common/navbar.html');
      this.navbarContent = await response.text();
    },
    init() {
      this.fetchNavbar();
    },
  };
}