
// Get all forms

const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");


// Show error message

function showError(id, message) {
    document.getElementById(id).textContent = message;
}


// Clear error message

function clearError(id) {
    document.getElementById(id).textContent = "";
}


// Email validation

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// Signup validation

function validateSignup() {

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    // Full name

    if (fullname === "") {
        showError("fullnameError", "Full name is required");
        isValid = false;
    } else {
        clearError("fullnameError");
    }


    // Email

    if (email === "") {
        showError("signupEmailError", "Email is required");
        isValid = false;
    } else if (!validEmail(email)) {
        showError("signupEmailError", "Enter a valid email address");
        isValid = false;
    } else {
        clearError("signupEmailError");
    }


    // Phone number

    if (phone === "") {
        showError("phoneError", "Phone number is required");
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        showError("phoneError", "Phone number must contain 10 digits");
        isValid = false;
    } else {
        clearError("phoneError");
    }


    // City

    if (city === "") {
        showError("cityError", "City is required");
        isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(city)) {
        showError("cityError", "City must contain only alphabets");
        isValid = false;
    } else {
        clearError("cityError");
    }


    // Password

    if (password === "") {
        showError("signupPasswordError", "Password is required");
        isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
        showError("signupPasswordError",
            "Minimum 8 characters with letters and numbers");
        isValid = false;
    } else {
        clearError("signupPasswordError");
    }


    // Confirm password

    if (confirmPassword === "") {
        showError("confirmPasswordError", "Confirm your password");
        isValid = false;
    } else if (password !== confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match");
        isValid = false;
    } else {
        clearError("confirmPasswordError");
    }

    return isValid;
}


// Real-time signup validation

if (signupForm) {

    signupForm.querySelectorAll("input").forEach(function(input) {

        input.addEventListener("input", function() {
            validateSignup();
        });

    });


    // Signup form submission

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (validateSignup()) {

            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const phone = document.getElementById("phone").value.trim();
            const city = document.getElementById("city").value.trim();
            const password = document.getElementById("signupPassword").value;


            // Get existing users

            let users = JSON.parse(localStorage.getItem("users")) || [];


            // Check whether email already exists

            const existingUser = users.find(function(user) {
                return user.email === email;
            });


            if (existingUser) {
                showError("signupEmailError", "This email is already registered");
                return;
            }


            // Create new user

            const newUser = {
                fullname: fullname,
                email: email,
                phone: phone,
                city: city,
                password: password
            };


            // Save user details

            users.push(newUser);

            localStorage.setItem("users", JSON.stringify(users));


            alert("Registration successful! Please sign in.");

            window.location.href = "SignIn.html";

        }

    });

}



// Signin validation

function validateSignin() {

    let isValid = true;

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;


    if (email === "") {
        showError("signinEmailError", "Email is required");
        isValid = false;
    } else if (!validEmail(email)) {
        showError("signinEmailError", "Enter a valid email address");
        isValid = false;
    } else {
        clearError("signinEmailError");
    }


    if (password === "") {
        showError("signinPasswordError", "Password is required");
        isValid = false;
    } else {
        clearError("signinPasswordError");
    }

    return isValid;
}



// Real-time signin validation

if (signinForm) {

    signinForm.querySelectorAll("input").forEach(function(input) {

        input.addEventListener("input", function() {
            validateSignin();
        });

    });


    // Signin form submission

    signinForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (validateSignin()) {

            const email = document.getElementById("signinEmail").value.trim().toLowerCase();
            const password = document.getElementById("signinPassword").value;


            // Get registered users

            let users = JSON.parse(localStorage.getItem("users")) || [];


            // Check email and password

            const loginUser = users.find(function(user) {
                return user.email === email && user.password === password;
            });


            if (loginUser) {

                alert("Login successful! Welcome " + loginUser.fullname);

                window.location.href = "travelapp.html";

            } else {

                showError("signinPasswordError",
                    "Invalid email or password. Please register first.");

            }

        }

    });

}



// Show and hide password

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const targetId = button.getAttribute("data-target");

        const passwordInput = document.getElementById(targetId);


        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            button.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            button.textContent = "Show";

        }

    });

});
