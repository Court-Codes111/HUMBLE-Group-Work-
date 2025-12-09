// Cart functions
// Function to add a product to the shopping cart
function addToCart(tier, company, image) {
    // Get current cart from localStorage or initialize empty array if cart doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to the cart array with its properties
    cart.push({
        tier: tier,     // Product tier/type
        company: company, // Company name
        image: image     // Product image filename
    });
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation alert to user
    alert(tier + " ADDED TO CART❗");
}

//============================
//     Completed By Jerome McKenzie
//  Question 2: Product Catalogue:
    //a.    Product List (Using Arrays & Objects)
//===========================


// Define products array
const products = [
    {
        name: "Sugarplum Box",
        tier: "Basic Box",
        price: 50,
        description: "Expect the unexpected. Fashion & beauty treasures, both brands deliver surprise and delight!",
        image: "../Assets/Y-box1.png",
        id: "sugarplum-box"
    },
    {
        name: "Bee Sweet Jamaica",
        tier: "Pro Box",
        price: 100,
        description: "Experience island sweetness brings you genuine Jamaican honey and curated local flavors!",
        image: "../Assets/G-box1.png",
        id: "beesweet-box"
    },
    {
        name: "AK TECH",
        tier: "Epic Box",
        price: 250,
        description: "Unbox the unknown with AK Tech's $50 Basic Tier mystery items worth up to double the value!",
        image: "../Assets/P-box1.png",
        id: "aktech-box"
    },
    {
        name: "Walkerswood",
        tier: "Basic Box",
        price: 50,
        description: "Authentic Jamaican jerk seasonings and sauces straight from the hills of St. Ann!",
        image: "../Assets/Y-box1.png",
        id: "walkerswood-box"
    },
    {
        name: "Tastee",
        tier: "Basic Box",
        price: 50,
        description: "Iconic Jamaican patties with a mystery twist!",
        image: "../Assets/Y-box1.png",
        id: "tastee-box"
    },
    {
        name: "Jablum",
        tier: "Pro Box",
        price: 100,
        description: "Premium Jamaican Blue Mountain coffee experience!",
        image: "../Assets/G-box1.png",
        id: "jablum-box"
    },
    {
        name: "Appleton Estate",
        tier: "Epic Box",
        price: 250,
        description: "World-renowned Jamaican rum with exclusive surprises!",
        image: "../Assets/P-box1.png",
        id: "appleton-box"
    },
    {
        name: "Digicel",
        tier: "Pro Box",
        price: 100,
        description: "Tech gadgets and mobile accessories mystery box!",
        image: "../Assets/G-box1.png",
        id: "digicel-box"
    },
    {
        name: "Grace",
        tier: "Basic Box",
        price: 50,
        description: "Jamaican culinary delights and pantry surprises!",
        image: "../Assets/Y-box1.png",
        id: "grace-box"
    }
];

// Initialize products in localStorage
function initializeProducts() {
    // Save products array to localStorage as AllProducts
    localStorage.setItem('AllProducts', JSON.stringify(products));
    
    // Display products on page load
    displayProducts();
}

// Function to display products dynamically
function displayProducts() {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) return;
    
    // Clear existing content
    productsContainer.innerHTML = '';
    
    // Get products from localStorage or use the array
    let storedProducts = JSON.parse(localStorage.getItem('AllProducts')) || products;
    
    // Create HTML for each product
    storedProducts.forEach(product => {
        // Determine CSS class based on tier
        let itemClass = 'item';
        let tierClass = 'tier';
        let detClass = 'det';
        let btnClass = 'btn';
        
        if (product.tier === 'Pro Box') {
            itemClass = 'item1';
            tierClass = 'tier1';
            detClass = 'det1';
            btnClass = 'btn1';
        } else if (product.tier === 'Epic Box') {
            itemClass = 'item2';
            tierClass = 'tier2';
            detClass = 'det2';
            btnClass = 'btn2';
        }
        
        // Create product card HTML
        const productHTML = `
            <div class="${itemClass}" id="${product.id}">
                <section class="${tierClass}">
                    <h1>${product.tier.toUpperCase()}</h1>
                </section>
                <img src="${product.image}" alt="${product.name}">
                <section class="${detClass}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                </section>
                <section class="${btnClass}">
                    <button onclick="purchase('${product.tier}', '${product.name}', '${product.id}')">
                        <h1>PURCHASE</h1>
                    </button>
                    <button class="btn-cart" onclick="addToCart('${product.tier}', '${product.name}', '${product.image}')">
                        <h1>ADD TO CART</h1>
                    </button>
                </section>
            </div>
        `;
        
        productsContainer.innerHTML += productHTML;
    });
}


// Function to purchase a mystery box item
function purchase(TierName, CompanyName, elementId) {
    // Array of possible random items that can be found in mystery boxes
    const randomItems = [
        "Gold Watch", "Vintage Comic", "Artisan Coffee", 
        "Limited Sneakers", "Crystal Vase", "Designer Perfume",
        "Smart Speaker", "Gaming Headset", "Fitness Tracker",
        "Bluetooth Earbuds", "Phone Case", "Portable Charger"
    ];
    
    // Select a random item from the array
    const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];
    
    // Get current purchases from localStorage or initialize empty array
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
    // Add new purchase to the purchases array
    purchases.push({
        box: TierName,        // Box tier/type
        company: CompanyName, // Company name
        itemFound: randomItem, // Random item found in the box
    });
    
    // Save updated purchases back to localStorage
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    // Get current cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out items from the same company (remove all items from this company)
    cart = cart.filter(item => item.company !== CompanyName);
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Get the product element by its ID
    const productElement = document.getElementById(elementId);
    
    // Hide the purchased product element if it exists
    if (productElement) {
        productElement.style.display = 'none';
    }
    
    // Show success alert with the found item
    alert(`🎉 You found: ${randomItem} from ${CompanyName}!`);
}

// Run initialization function when window loads
window.onload = function() {
    initializeProducts(); // Call function to set up initial products
};

