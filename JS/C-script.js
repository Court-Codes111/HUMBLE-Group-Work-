//============================
//  Question 3: Cart 
    // WE GIVE NO DISCOUNTS
//===========================


// Function to display cart items in the HTML
function displaycart(){
    // Get cart items from localStorage, or initialize empty array if none exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let output = ""; // Initialize empty string to build HTML output

    // Loop through each item in the cart array
    cart.forEach(function(item,index){
        // Build HTML for each cart item with image, tier, company, and action buttons
        output += `
            <div class="cartbox">
                <img src="../Assets/${item.image}" width="100"> <!-- Display item image -->
                <section>
                <h3>${item.tier}</h3> <!-- Display item tier -->
                <p>${item.company}</p> <!-- Display company name -->
                <button onclick="removeFromCart(${index})">Remove</button> <!-- Remove button -->
                <button onclick="purchaseFromCart('${item.tier}', '${item.company}', ${index})">Purchase</button> <!-- Purchase button -->
              </section>
            </div>
        `;
    });

    // Insert the generated HTML into the cartItems element
    document.getElementById('cartItems').innerHTML = output;
}

// Call displaycart to show initial cart contents on page load
displaycart();

// Function to clear all items from the cart
function clearCart() {
    // Show confirmation dialog before clearing cart
    if (confirm("Clear entire cart?")) {
        // Remove both cart and purchases data from localStorage
        localStorage.removeItem('cart');
        // Refresh both displays after clearing
        displaycart();
        showPurchases();
    }
}

// Function to remove a specific item from the cart
function removeFromCart(index) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Remove item at the specified index
    cart.splice(index, 1);
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Refresh cart display
    displaycart();
}

// Function to display purchased items and calculate totals
function showPurchases() {
    // Get purchases from localStorage, or initialize empty array if none exist
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    let output = ""; // Initialize empty string to build HTML output

    // Initialize variables for cost calculations
    let TotalCost = 0; // Final total cost
    let tax= 0; // Tax amount
    let ship= 20; // Fixed shipping cost
    let supTotal= 0; // Subtotal before tax and shipping

    // Loop through each purchase
    purchases.forEach(function(purchase, index) {
        // Calculate costs for each purchase
        supTotal += 1000; // Each item costs $1000
        tax= 0.15 * supTotal; // Calculate tax (15% of subtotal)
        TotalCost= supTotal + ship + tax; // Calculate final total

        // Build HTML for each purchase item
        output += `
            <div class="unbox-info">
                <img src="../Assets/B-icon1.png"> <!-- Display icon -->
                <section>
                <h3>Purchase #${index + 1}</h3> <!-- Purchase number -->
                <p><b>Box:</b> ${purchase.box}</p> <!-- Box tier -->
                <p><b>Item Found:</b> ${purchase.itemFound}</p> <!-- Random item found -->
                </section>
            </div>
        `;
    });
    
    // Update HTML elements with calculated values
    document.getElementById('unboxItems').innerHTML = output; // Display purchase items
    document.getElementById('subtotal').innerHTML = `$${supTotal}.00`; // Display subtotal
    document.getElementById('shipping').innerHTML = `$${ship}.00`; // Display shipping
    document.getElementById('tax').innerHTML = `$${tax.toFixed(2)}`; // Display tax (2 decimal places)
    document.getElementById('totalItems').innerHTML = `$${TotalCost.toFixed(2)}`; // Display total (2 decimal places)
}

// Call showPurchases to display initial purchase data on page load
showPurchases();

// Function to purchase a specific item from the cart
function purchaseFromCart(TierName, CompanyName, index) {
    // Array of random items that can be found in mystery boxes
    const randomItems = [
        "Gold Watch", "Vintage Comic", "Artisan Coffee", 
        "Limited Sneakers", "Crystal Vase", "Designer Perfume",
        "Smart Speaker", "Gaming Headset", "Fitness Tracker",
        "Bluetooth Earbuds", "Phone Case", "Portable Charger"
    ];
    
    // Select a random item from the array
    const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];
    
    // Get current purchases from localStorage
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    // Add new purchase to the array
    purchases.push({
        box: TierName, // Box tier
        company: CompanyName, // Company name
        itemFound: randomItem, // Random item found
    });
    
    // Save updated purchases back to localStorage
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    // Remove purchased item from cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    
    // Show alert with purchase result
    alert(`🎉 You found: ${randomItem} from ${CompanyName}!`);
    
    // Refresh both displays after purchase
    displaycart();
    showPurchases();
}

// Function to proceed to checkout page
function proceedToCheckout() {
    // Get current purchases
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
    // Check if there are any purchases
    if(purchases.length === 0) {
        alert("Please purchase items before checkout!"); // Alert if cart is empty
        return; // Exit function
    }
    
    // Redirect to checkout page
    window.location.href = "Checkout.html";

}
