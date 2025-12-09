// ============================================================
// 1. WHEN PAGE LOADS - CHECK IF WE SHOULD SHOW AN INVOICE
// ============================================================

// Wait for HTML page to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Check if we have saved items from checkout
    let savedItems = JSON.parse(localStorage.getItem('SavedItems')) || [];
    
    if (savedItems.length === 0) {
        // If no saved items, check if we have any past checkouts
        let allCheckouts = JSON.parse(localStorage.getItem("allCheckouts")) || [];
        if (allCheckouts.length > 0) {
            // Found past checkout - load invoice from that
            loadInvoice();
        } else {
            // No purchase data found - send user back to homepage
            alert("No purchase data found. Please complete a purchase first.");
            window.location.href = "Home.html";
        }
    } else {
        // User just made a purchase - load the invoice
        loadInvoice();
    }
});





// ============================================================
// 2. LOAD INVOICE DATA FUNCTION
// ============================================================

function loadInvoice() {
    // Get data from browser storage
    let allCheckouts = JSON.parse(localStorage.getItem("allCheckouts")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let savedItems = JSON.parse(localStorage.getItem('SavedItems')) || [];
    
    // This to what data we have saved, if Some of he data looks like it
    //is missing its becuase i did some test before complete some pats of the code
    console.log("Current User:", currentUser);
    console.log("User TRN:", currentUser.TRN);
    console.log("Saved Items:", savedItems);
    console.log("All Checkouts:", allCheckouts);
    
    if (allCheckouts.length === 0) {
        alert("No checkout data found. Please complete a purchase first.");
        window.location.href = "Home.html";
        return;
    }
    
    // Get the most recent checkout (last item in array)
    let latestCheckout = allCheckouts[allCheckouts.length - 1];
    
    // Create and show the invoice
    generateInvoice(latestCheckout, currentUser, savedItems);
}





// ============================================================
// 3. CREATE INVOICE FUNCTION
// ============================================================

function generateInvoice(checkoutData, currentUser, savedItems) {
    // Create unique invoice number using current timestamp
    let invoiceNumber = "INV-" + Date.now();
    
    // Calculate money amounts
    let supTotal = savedItems.length * 1000; // Each item = $1000
    let ship = 20;  // Shipping cost
    let tax = supTotal * 0.15;  // 15% tax
    let totalCost = supTotal + ship + tax;  // Grand total
    
    // Get the user TRN from currentUser
    let userTRN = currentUser.TRN || "Not provided";
    
    // Create invoice object with all details
    let invoice = {
        invoiceNumber: invoiceNumber,  // Unique ID for invoice
        date: new Date().toLocaleDateString(),  // Today's date
        company: "HUMBLE BOX",  // Your company name
        customerName: checkoutData[0] + " " + checkoutData[1],  // First + Last name
        customerTRN: userTRN,  // Tax Registration Number from currentUser
        shippingAddress: checkoutData[4] + ", " + checkoutData[5] + ", " + checkoutData[6],  // Address
        items: savedItems,  // List of purchased items FROM SAVEDITEMS
        subtotal: supTotal,  // Cost before tax/shipping
        shipping: ship,  // Shipping cost
        tax: tax,  // Tax amount
        total: totalCost  // Final total
    };
    
    // Save invoice to browser storage
    saveInvoice(invoice);
    
    // Show invoice on the page
    displayInvoice(invoice);
    
    // Tell user invoice was sent
    alert("Invoice has been sent to your email: " + checkoutData[3]);
}





// ============================================================
// 4. SAVE INVOICE TO BROWSER STORAGE
// ============================================================

function saveInvoice(invoice) {
    // Get existing invoices or start with empty array
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    
    // Add new invoice to the list
    allInvoices.push(invoice);
    
    // Save updated list back to browser
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));
}





// ============================================================
// 5. SHOW INVOICE ON THE PAGE
// ============================================================

function displayInvoice(invoice) {
    // 5A. CUSTOMER INFORMATION SECTION
    document.getElementById("customerInfo").innerHTML = `
        <p><strong>Name:</strong> ${invoice.customerName}</p>
        <p><strong>TRN:</strong> ${invoice.customerTRN}</p>
        <p><strong>Shipping Address:</strong> ${invoice.shippingAddress}</p>
    `;
    
    // 5B. INVOICE DETAILS SECTION
    document.getElementById("invoiceInfo").innerHTML = `
        <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
        <p><strong>Date:</strong> ${invoice.date}</p>
        <p><strong>Company:</strong> ${invoice.company}</p>
    `;
    
    // 5C. ITEMS TABLE SECTION
    let itemsHTML = "";
    
    // Check if we have items
    if (invoice.items && invoice.items.length > 0) {
        invoice.items.forEach(item => {
            itemsHTML += `
                <tr>
                    <td>${item.itemFound || "Mystery Item"}</td>
                    <td>${item.box}</td>
                    <td>${item.company || "Unknown"}</td>
                    <td>$${getPriceByTier(item.box)}.00</td>
                </tr>
            `;
        });
    } else {
        itemsHTML = `<tr><td colspan="4">No items found</td></tr>`;
    }
    
    document.getElementById("invoiceItems").innerHTML = itemsHTML;
    
    // 5D. TOTALS SECTION
    document.getElementById("invoiceSubtotal").textContent = `$${invoice.subtotal}.00`;
    document.getElementById("invoiceShipping").textContent = `$${invoice.shipping}.00`;
    document.getElementById("invoiceTax").textContent = `$${invoice.tax.toFixed(2)}`;
    document.getElementById("invoiceTotal").textContent = `$${invoice.total.toFixed(2)}`;
}





//Get the price by Box tier

function getPriceByTier(tier) {
    // Return different price based on box type
    switch(tier) {
        case "Basic Box": return 50;
        case "Pro Box": return 100;
        case "Epic Box": return 250;
        default: return 0;  // If unknown tier
    }
}




// ============================================================
// 8. SHOW ALL INVOICES IN CONSOLE
// Question 6: b.  ShowInvoices()  
// ============================================================

function showAllInvoices() {
    // Get all saved invoices
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    
    // Display in browser console (F12 to see)
    console.log("=== ALL INVOICES ===");
    console.log("Total invoices: " + allInvoices.length);
    
    // Loop through each invoice and show details
    allInvoices.forEach((invoice, index) => {
        console.log(`\nInvoice #${index + 1}:`);
        console.log("Invoice Number: " + invoice.invoiceNumber);
        console.log("Date: " + invoice.date);
        console.log("Customer: " + invoice.customerName);
        console.log("TRN: " + invoice.customerTRN);
        console.log("Total: $" + invoice.total.toFixed(2));
        console.log("Items: " + invoice.items.length);
    });
    
    // Check console and if it looks mixed up, I was testing so information is null sfor some.
    alert("Check console (F12) to view all invoices or Right click the screen and go to inspect afterwards look in console for the Invoices.");
}





// ============================================================
// 9. SEARCH INVOICES BY TRN NUMBER
// ============================================================

function searchInvoices() {
    // Get TRN number user typed in search box
    let searchTRN = document.getElementById("searchTRN").value;
    
    // Get all invoices
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    
    // Check if user entered a TRN
    if (!searchTRN) {
        alert("Please enter a TRN to search");
        return;
    }
    
    // Filter invoices to find ones with matching TRN
    let filteredInvoices = allInvoices.filter(invoice => 
        invoice.customerTRN.toString() === searchTRN
    );
    
    // Get div where results will be shown
    let resultsDiv = document.getElementById("searchResults");
    
    // If no invoices found
    if (filteredInvoices.length === 0) {
        resultsDiv.innerHTML = "<p>No invoices found for TRN: " + searchTRN + "</p>";
        return;
    }
    
    // Create HTML to show found invoices
    let resultsHTML = "<div class='search-results'><h4>Found " + filteredInvoices.length + " invoice(s):</h4>";
    
    // Add each found invoice to results
    filteredInvoices.forEach((invoice, index) => {
        resultsHTML += `
            <div style="margin-bottom: 15px; padding: 10px; background: #333; border-radius: 5px;">
                <p><strong>Invoice #${index + 1}:</strong> ${invoice.invoiceNumber}</p>
                <p><strong>Date:</strong> ${invoice.date}</p>
                <p><strong>Customer:</strong> ${invoice.customerName}</p>
                <p><strong>Total:</strong> $${invoice.total.toFixed(2)}</p>
                <p><strong>Items:</strong> ${invoice.items.length} item(s)</p>
            </div>
        `;
    });
    
    resultsHTML += "</div>";
    resultsDiv.innerHTML = resultsHTML;
}





// ============================================================
// 10. GET INVOICES FOR CURRENT LOGGED-IN USER
// Question 6:  c. GetUserInvoices() 
// ============================================================

function getUserInvoices() {
    // Get current logged-in user
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    let userTRN = currentUser.TRN;
    
    // Check if user is logged in
    if (!userTRN) {
        alert("Please log in to view your invoices");
        window.location.href = "Login.html";
        return;
    }
    
    // Get all invoices
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    
    // Filter to find invoices with user's TRN
    let userInvoices = allInvoices.filter(invoice => 
        invoice.customerTRN.toString() === userTRN.toString()
    );
    
    // Show in console
    console.log("=== YOUR INVOICES ===");
    console.log("Total invoices: " + userInvoices.length);
    
    // If no invoices found
    if (userInvoices.length === 0) {
        alert("No invoices found for your account");
        console.log("No invoices found for TRN: " + userTRN);
        return;
    }
    
    // Display each invoice in console
    userInvoices.forEach((invoice, index) => {
        console.log(`\nInvoice #${index + 1}:`);
        console.log("Invoice Number: " + invoice.invoiceNumber);
        console.log("Date: " + invoice.date);
        console.log("Total: $" + invoice.total.toFixed(2));
        console.log("Items purchased: " + invoice.items.length);
        
        // Show each item in the invoice
        invoice.items.forEach(item => {
            console.log("  - " + item.box + " from " + (item.company || "Unknown"));
        });
    });
    
    // Check console for the invoices
    alert("Check console (F12) to view your invoices or Right click the screen and go to inspect afterwards look in console for the Invoices.");
}