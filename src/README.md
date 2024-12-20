# FoodNest(S) Website Recreation

## Project Overview
We are recreating the **FoodNest(S)** website using the **Alpine.Js** and **Tailwind CSS**. This project is a collaboration between **Sushil Kumar** and **Manav Jain**, aimed at enhancing the website's performance, design, and overall user experience.

## Technology Stack
- **Alpine.Js Framework**: A lightweight and efficient JavaScript framework for building web applications.
- **Tailwind CSS**: A utility-first CSS framework for designing modern and responsive user interfaces.

## Features
- **Modern Design**: Leveraging Tailwind CSS to create a visually appealing and responsive UI.
- **Lightweight Framework**: Utilizing the Van Framework for fast and efficient rendering.
- **Optimized Performance**: Recreating the website with a focus on improved load times and interactivity.

<!-- Images -->
   <!-- Home page -->
## Home Page
![Home Page](https://github.com/sushil72/Foodnests-Alpine.Js/blob/main/assets/images/demo/Home%20Page.png?raw=true)

The Home Page of FoodNest(s) serves as the central hub for users to explore the platform's offerings. Key features of the Home Page include:

### Navigation Bar:
* A responsive navbar that provides easy access to various food catalogs, vendor categories, and additional sections of the website.
* Includes links to the Home Page, Cart Page, and user-specific functionalities like login or profile.

### Vendors Display:
* A curated list of vendors showcasing their specialties, making it easier for users to explore and discover unique cuisines or food items.
* Vendor information includes names, logos, and brief descriptions to entice users to visit their catalog.

### Featured Products:
* A section highlighting popular or trending food items, encouraging users to explore and add them to their cart.
* Each product card includes an image, name, price, and an "Add to Cart" button.

### Search and Filters:
* Options to search for specific dishes, cuisines, or vendors directly from the Home Page.
* Filtering functionality to sort by price, popularity, or cuisine type.

   <!-- Cart Page -->
## Shopping Cart
![Cart](https://github.com/sushil72/Foodnests-Alpine.Js/blob/main/assets/images/demo/Cart.png?raw=true)

The Cart Page is designed to offer users a seamless checkout experience while providing a clear summary of their selected items. Key features include:

### Cart Summary:
* A detailed view of all the items added to the cart, with information such as item name, vendor, quantity, and price.
* Users can see the total price of their order, including taxes and applicable discounts.

### Editable Quantity:
* Users can update the quantity of each item directly on the Cart Page. The total price dynamically adjusts based on these changes.

### Remove Items:
* A "Remove" option to delete unwanted items from the cart.

### Proceed to Checkout:
* A prominent "Checkout" button that redirects users to the payment gateway or address selection process.

### Empty Cart Message:
* If the cart is empty, users see a friendly message encouraging them to return to the Home Page and explore more products.

<!-- Project Structure -->
## Project Structure
```plaintext
/foodnest
├── /src
│   ├── /components            # Reusable components
│   ├── /javascript            # Javascript code
│   ├── /Pages                 # Individual pages
│   ├── /routes                # Routing of the Application
│   ├── /store                 # State Management of the Application
│   └── app.js                 # Entry point of the application
├── /assets                    # Static files (styles, images, fonts, etc.)
├── tailwind.config.js         # Tailwind CSS configuration
└── index.html                 # Main HTML file
```

## Setup and Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd foodnest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run tail
   or, "npx tailwindcss -i ./assets/css/input.css -o ./assets/css/style.css --watch"
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Collaboration
This project is a collaborative effort between:
- **Sushil Kumar**
- **Manav Jain**

## Contribution
Feel free to contribute to this project by creating pull requests or reporting issues. We welcome all feedback and suggestions.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.