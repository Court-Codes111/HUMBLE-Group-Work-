//---------------------------------------------------------
//  Question 1: b.  Login Page:
//       Completed by Mark Palmer
//---------------------------------------------------------

// Define maximum allowed failed login attempts before account lock
const MAX_ATTEMPTS = 3;

//====================
//Question 1: button 
// iv.  Login button (validate user login information)
// vi.   Reset Password hyperlink 
//==========================


function checkLogin() {
    // Get user input values from login form
    let TRN = document.getElementById('TRN').value;         // Get TRN number input
    let password = document.getElementById('password').value; // Get password input
    let errorMessage = document.getElementById('errorMessage'); // Get error message display element

    // Retrieve login attempts tracking object from localStorage
    // This stores failed attempts per TRN, like : { "123456789": 2, "987654321": 1 }
    let loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || {};
    
    // Get current attempt count for this specific TRN, if no record exists its 0
    let attempts = loginAttempts[TRN] || 0;

    // FIRST CHECK: Verify if account is already locked, max attempt is 3 that was set at the top
    if (attempts >= MAX_ATTEMPTS) {
        errorMessage.innerText = "Account locked. Please reset your password.";
        errorMessage.style.display = "block";
        return false; // Prevent further login attempts
    }







    // Retrieve all registered users from localStorage
    let savedUsers = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    // Search for a user matching both TRN and password
    let validUser = savedUsers.find(user =>
        user.TRN.toString() === TRN &&   // Convert stored TRN to string for comparison
        user.password === password       // Compare passwords (exact match)
    );






    // SUCCESSFUL LOGIN: Credentials match
    if (validUser) {
        // Clear failed attempts for this TRN (successful login resets counter)
        delete loginAttempts[TRN];
        localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts));
        
        // Clear any previous error messages
        errorMessage.style.display = "none";
        
        // Store current user session data for use throughout the application
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        
        // Redirect to main Home page if validation is true
        window.location.href = "Home.html";
        return true; // Login successful
    } 







    // FAILED LOGIN: Incorrect credentials
    else {
        // Increment failed attempt counter
        attempts++;
        loginAttempts[TRN] = attempts; // Update attempt count for this TRN
        localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts)); // Save to localStorage

        // Check if this failed attempt reaches the maximum limit
        if (attempts >= MAX_ATTEMPTS) {
            // Account is now locked - show final warning
            errorMessage.innerText = `Account locked after ${MAX_ATTEMPTS} failed attempts. Please reset your password.`;
            
            // Redirect user to error/reset password page
            window.location.href = "Error.html";
        } else {
            // Still have attempts remaining - inform user
            errorMessage.innerText = `Invalid TRN or password. ${MAX_ATTEMPTS - attempts} attempt(s) remaining.`;
        }
        
        // Display the error message to user
        errorMessage.style.display = "block";
        return false; // Login failed
    }



  //When the users reset the password
  //
    /*
    documentgetById("reset").addEventListener('click', function() {
     
     // Clear failed attempts for this TRN 
     localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts));
     delete loginAttempts[TRN];
        



    });
}

*/



//====================
//Question 1: button 
// v.    Cancel (used to clear data from the login form)
//==========================
function clearForm() {
    // Reset all input fields in the login form to empty/default values
    document.getElementById("LoginForm").reset();
}