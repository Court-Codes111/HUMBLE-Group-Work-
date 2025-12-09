//---------------------------------------------------------
//  Question 1: 1.   User Authentication (LocalStorage)
//       Completed by Mark Palmer
//---------------------------------------------------------




// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');


    //=======================
    //Question 1: button
    // vii. Register (used to stored registration form data) 
    //=====================
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // stop default submission

        if (validateForm()) {
            storeData();
            form.submit(); // or redirect manually
        }
    });
});

//validation function 
function validateForm() {

    // Load existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Collect needed fields
    let password = document.querySelector('input[name="usercode"]').value;
    let TRN = document.querySelector('input[name="TRN"]').value;
    let email = document.querySelector('input[name="mail"]').value;

    //checks for password errors
    let hasUppercase = /[A-Z]/.test(password);
    let digitCount = (password.match(/[0-9]/g) || []).length;
    let TRNCount = (TRN.match(/[0-9]/g) || []).length;

    if (!hasUppercase || digitCount < 3) {
        alert("Password must contain at least ONE capital letter and at least THREE numbers.");
        return false;
    }

    //checks if TRN is 9 digits and prints an error message if not
    if (TRNCount !== 9) {
        alert("TRN must be EXACTLY 9 digits.");
        return false;
    }

    // This checks if there is more than one email
    let exists = users.some(u => u.email === email);
    if (exists) {
        alert("An account with this email already exists.");
        return false;
    }


    // Add age check
    let DOB = document.querySelector('input[name="dob"]').value;
    
    if (DOB) {
        let birthDate = new Date(DOB);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

     if (age < 18) {
            alert("You must be 18 years or older to register.");
            return false;
        }
    }


    return true; // Passed all checks
}

// =========================
//  Question 1: a; Registration
//  STORE USER DATA
// =========================
function storeData() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Collect user input
    let username = document.querySelector('input[name="username"]').value;
    let contact = document.querySelector('input[name="contact"]').value;
    let DOB = document.querySelector('input[name="dob"]').value;
    let email = document.querySelector('input[name="mail"]').value;
    let street = document.querySelector('input[name="street"]').value;
    let city = document.querySelector('input[name="city"]').value;
    let parish = document.querySelector('input[name="parish"]').value;
    let zip = document.querySelector('input[name="ZIP"]').value;
    let country = document.querySelector('input[name="country"]').value;
    let locate = document.querySelector('input[name="locate"]').value;
    let ID = document.querySelector('input[name="ID"]').value;     
    let TRN = document.querySelector('input[name="TRN"]').value;
    let password = document.querySelector('input[name="usercode"]').value;
    let gender = document.querySelector('select[name="gender"]').value;

    // Create user object
    let newUser = {
        username,
        contact,
        DOB,
        email,
        address: {
            street,
            city,
            parish,
            zip,
            country
        },
        locate,
        ID: ID,
        TRN: TRN,
        password,
        gender: gender
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("RegistrationData", JSON.stringify(users));

    console.log("User saved:", newUser);
}


//====================
//Question 1: button 
// viii.    Cancel (used to clear data from the registration form)
//==========================
function clearForm() {

    // clear text inputs
    document.getElementById("registrationForm").reset();

}
