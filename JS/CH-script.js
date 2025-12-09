// Load order summary when page loads
function loadOrderSummary() {
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    let output = "";

    let TotalCost = 0;
    let tax= 0;
    let ship= 20;
    let supTotal= 0;

    if (purchases.length === 0) {
        output = `<div class="order-item"><div class="item-name">Your cart is empty</div></div>`;
        document.getElementById('orderItems').innerHTML = output;
        return;
    }

    purchases.forEach(function(purchase, index) {
        supTotal += 1000;
        tax= 0.15 * supTotal;
        TotalCost= supTotal + ship + tax;
        
        output += `
            <div class="order-item">
                <div class="item-name">${purchase.box} - ${purchase.itemFound}</div>
            </div>
        `;
    });

    document.getElementById('orderItems').innerHTML = output;
    document.getElementById('checkoutSubtotal').innerHTML = `$${supTotal}.00`;
    document.getElementById('checkoutShipping').innerHTML = `$${ship}.00`;
    document.getElementById('checkoutTax').innerHTML = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').innerHTML = `$${TotalCost.toFixed(2)}`;
}

// =========================
//  CHECKOUT ARRAY (VALIDATE & STORE)
//---------------------------------------------------------------------------------------------------------------------
//Question 4: Checkout Page: 
// b.   Allow the user to enter their shipping details (e.g., name, address, amount being paid).

// =========================
function checkoutArray() {
    // Get purchases BEFORE creating array
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
    // Collect all form fields into array
    let checkoutData = [
        document.querySelector('input[placeholder="Enter First Name"]').value,
        document.querySelector('input[placeholder="Enter Last Name"]').value,
        document.querySelector('input[placeholder="Enter Phone Number"]').value,
        document.querySelector('input[placeholder="Enter Email Address"]').value,
        document.querySelector('input[placeholder="Enter Delivery Address"]').value,
        document.querySelector('input[placeholder="Enter City"]').value,
         document.querySelector('input[placeholder="Enter State/Parish"]').value,
        document.querySelector('input[placeholder="Enter ZIP Code"]').value,
        document.querySelector('select').value,
        document.querySelector('input[placeholder="Enter Card Number"]').value,
        document.querySelector('input[placeholder="MM/YY"]').value,
        document.querySelector('input[placeholder="CVV"]').value,
        document.querySelector('textarea').value,
        new Date().toLocaleString(),
        document.getElementById('checkoutTotal').innerText,
        purchases  // Now this is the variable, not the function call
    ];
    
    return checkoutData;
}

// =========================
//  PLACE ORDER
// =========================
function placeOrder() {
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
    if (purchases.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    
    // Get checkout array
    let checkoutData = checkoutArray();
    
    // Validate - check first 12 fields (required)
    for (let i = 0; i < 12; i++) {
        if (!checkoutData[i] || checkoutData[i].trim() === "") {
            alert("Please fill out all required fields.");
            return;
        }
    }
    
    // Get existing checkouts or create empty array
    let allCheckouts = JSON.parse(localStorage.getItem("allCheckouts")) || [];
    
    // Add new checkout to array
    allCheckouts.push(checkoutData);
    
    // Save to localStorage
    localStorage.setItem("allCheckouts", JSON.stringify(allCheckouts));

    
    // Show success message
    alert("Order placed successfully! Thank you for your purchase.");
    







    //------------------------------------------------------------------------------
    //c.    When the user confirms the checkout, generate an invoice


    //Before clearing the purchase save the bought items
    let invoiceitems= JSON.parse(localStorage.getItem('purchases')) || [];
     localStorage.setItem("SavedItems", JSON.stringify(purchases));

    // Clear purchases
    localStorage.removeItem('purchases');
    
    // Redirect to homepage
    window.location.href = "Home.html";
}

// Load order summary when page loads
window.onload = loadOrderSummary;