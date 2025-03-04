document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the Register Page
    if (document.getElementById("register-form")) {
        const countrySelect = document.getElementById("country");
        const countryCodeInput = document.getElementById("countryCode");

        const countries = { "Kenya": "254", "USA": "1", "UK": "44" };

        // Populate country dropdown and set a default country
        for (const country in countries) {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        }

        // Set default country and country code
        countrySelect.value = "Kenya";  // Default to Kenya
        countryCodeInput.value = countries["Kenya"];

        // Update country code based on selected country
        countrySelect.addEventListener("change", () => {
            countryCodeInput.value = countries[countrySelect.value];
        });

        // Handle registration form submission
        document.getElementById("register-form").addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form from refreshing the page

            // Ensure countryCode is set before sending data
            if (!countryCodeInput.value) {
                alert("Please select a country.");
                return;
            }

            try {
                const res = await fetch("https://your-backend.herokuapp.com/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fullName: document.getElementById("fullName").value,
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        age: document.getElementById("age").value,
                        gender: document.querySelector('input[name="gender"]:checked').value,
                        phone: document.getElementById("phone").value,
                        countryCode: countryCodeInput.value  // Ensure this is always sent
                    })
                });

                const data = await res.json();
                if (res.ok) {
                    // Successful registration, redirect to uso-red
                    window.location.href = "https://uso-red.vercel.app";
                } else {
                    // Show error message
                    alert(data.msg || "Registration failed. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }

    // Check if we are on the Login Page
    if (document.getElementById("login-form")) {
        // Handle login form submission
        document.getElementById("login-form").addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form from refreshing the page

            try {
                const res = await fetch("https://your-backend.herokuapp.com/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value
                    })
                });

                const data = await res.json();
                
                if (res.ok) {
                    // Successful login, redirect to uso-red
                    window.location.href = "https://uso-red.vercel.app";
                } else {
                    // Show error message if login fails
                    alert(data.msg || "Invalid email or password.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
