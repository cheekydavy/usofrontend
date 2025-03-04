document.addEventListener("DOMContentLoaded", () => {
    // For Register Page (index.html)
    if (document.getElementById("register-form")) {
        const countrySelect = document.getElementById("country");
        const countryCodeInput = document.getElementById("countryCode");

        const countries = { "Kenya": "254", "USA": "1", "UK": "44" };

        // Populate country dropdown
        for (const country in countries) {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        }

        // Update country code based on selected country
        countrySelect.addEventListener("change", () => {
            countryCodeInput.value = countries[countrySelect.value];
        });

        // Handle registration form submission
        document.getElementById("register-form").addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form from refreshing the page

            const res = await fetch("https://usobackend-d8daed181ebc.herokuapp.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: document.getElementById("fullName").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    age: document.getElementById("age").value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    phone: document.getElementById("phone").value,
                    countryCode: document.getElementById("countryCode").value
                })
            });

            const data = await res.json();
            if (res.ok) {
                // Successful registration, redirect to uso-red
                window.location.href = "https://uso-red.vercel.app";
            } else {
                // Show error message
                alert(data.msg);
            }
        });
    }

    // For Login Page (login.html)
    if (document.getElementById("login-form")) {
        // Handle login form submission
        document.getElementById("login-form").addEventListener("submit", async (e) => {
            e.preventDefault();  // Prevent form from refreshing the page

            const res = await fetch("https://usobackend-d8daed181ebc.herokuapp.com/api/auth/login", {
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
                alert(data.msg);
            }
        });
    }
});
