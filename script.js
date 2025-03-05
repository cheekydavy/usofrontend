document.addEventListener("DOMContentLoaded", async () => {
    // Check if we are on the Register Page
    if (document.getElementById("register-form")) {
        const countrySelect = document.getElementById("country");
        const countryCodeInput = document.getElementById("countryCode");
        const genderSelect = document.getElementById("gender");

        // Full list of countries with their dialing codes
        const countries = {
            "Afghanistan": "93", "Albania": "355", "Algeria": "213", "Andorra": "376", "Angola": "244", "Antigua and Barbuda": "1",
            "Argentina": "54", "Armenia": "374", "Australia": "61", "Austria": "43", "Azerbaijan": "994", "Bahamas": "1", "Bahrain": "973",
            "Bangladesh": "880", "Barbados": "1", "Belarus": "375", "Belgium": "32", "Belize": "501", "Benin": "229", "Bhutan": "975",
            "Bolivia": "591", "Bosnia and Herzegovina": "387", "Botswana": "267", "Brazil": "55", "Brunei": "673", "Bulgaria": "359",
            "Burkina Faso": "226", "Burundi": "257", "Cambodia": "855", "Cameroon": "237", "Canada": "1", "Cape Verde": "238", "Chad": "235",
            "Chile": "56", "China": "86", "Colombia": "57", "Comoros": "269", "Congo": "242", "Costa Rica": "506", "Croatia": "385",
            "Cuba": "53", "Cyprus": "357", "Czech Republic": "420", "Denmark": "45", "Djibouti": "253", "Dominica": "1", "Ecuador": "593",
            "Egypt": "20", "El Salvador": "503", "Estonia": "372", "Eswatini": "268", "Ethiopia": "251", "Fiji": "679", "Finland": "358",
            "France": "33", "Gabon": "241", "Gambia": "220", "Georgia": "995", "Germany": "49", "Ghana": "233", "Greece": "30",
            "Guatemala": "502", "Guinea": "224", "Haiti": "509", "Honduras": "504", "Hungary": "36", "Iceland": "354", "India": "91",
            "Indonesia": "62", "Iran": "98", "Iraq": "964", "Ireland": "353", "Israel": "972", "Italy": "39", "Jamaica": "1",
            "Japan": "81", "Jordan": "962", "Kazakhstan": "7", "Kenya": "254", "Kuwait": "965", "Kyrgyzstan": "996", "Laos": "856",
            "Latvia": "371", "Lebanon": "961", "Lesotho": "266", "Liberia": "231", "Libya": "218", "Lithuania": "370", "Luxembourg": "352",
            "Madagascar": "261", "Malawi": "265", "Malaysia": "60", "Maldives": "960", "Mali": "223", "Malta": "356", "Mauritania": "222",
            "Mauritius": "230", "Mexico": "52", "Moldova": "373", "Monaco": "377", "Mongolia": "976", "Montenegro": "382", "Morocco": "212",
            "Mozambique": "258", "Myanmar": "95", "Namibia": "264", "Nepal": "977", "Netherlands": "31", "New Zealand": "64",
            "Nicaragua": "505", "Niger": "227", "Nigeria": "234", "North Korea": "850", "Norway": "47", "Oman": "968", "Pakistan": "92",
            "Panama": "507", "Paraguay": "595", "Peru": "51", "Philippines": "63", "Poland": "48", "Portugal": "351", "Qatar": "974",
            "Romania": "40", "Russia": "7", "Rwanda": "250", "Saudi Arabia": "966", "Senegal": "221", "Serbia": "381", "Seychelles": "248",
            "Singapore": "65", "Slovakia": "421", "Slovenia": "386", "South Africa": "27", "South Korea": "82", "Spain": "34",
            "Sri Lanka": "94", "Sudan": "249", "Suriname": "597", "Sweden": "46", "Switzerland": "41", "Syria": "963", "Taiwan": "886",
            "Tajikistan": "992", "Tanzania": "255", "Thailand": "66", "Togo": "228", "Tunisia": "216", "Turkey": "90", "Uganda": "256",
            "Ukraine": "380", "United Arab Emirates": "971", "United Kingdom": "44", "United States": "1", "Uruguay": "598", "Uzbekistan": "998",
            "Vatican City": "379", "Venezuela": "58", "Vietnam": "84", "Yemen": "967", "Zambia": "260", "Zimbabwe": "263",
            "Antarctica": "672", "Arctic Ocean": "672", "British Indian Ocean Territory": "246", "Caribbean Netherlands": "599",
            "Cayman Islands": "1", "Falkland Islands": "500", "French Guiana": "594", "Greenland": "299", "Guadeloupe": "590",
            "Martinique": "596", "Montserrat": "1", "Reunion": "262", "Saint Barthelemy": "590", "Saint Helena": "290", "Saint Pierre and Miquelon": "508",
            "Sint Eustatius": "599", "South Georgia and the South Sandwich Islands": "500", "Turks and Caicos Islands": "1"
        };

        // Populate country dropdown
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
            e.preventDefault();  // Prevent form refresh

            if (!countryCodeInput.value) {
                alert("Please select a country.");
                return;
            }

            try {
                const res = await fetch("https://usobackend-d8daed181ebc.herokuapp.com/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fullName: document.getElementById("fullName").value,
                        email: document.getElementById("email").value,
                        password: document.getElementById("password").value,
                        age: document.getElementById("age").value,
                        gender: genderSelect.value,  // Now using dropdown
                        phone: document.getElementById("phone").value,
                        countryCode: countryCodeInput.value
                    })
                });

                const data = await res.json();
                if (res.ok) {
                    window.location.href = "https://uso-red.vercel.app";
                } else {
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
        document.getElementById("login-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
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
                    window.location.href = "https://uso-red.vercel.app";
                } else {
                    alert(data.msg || "Invalid email or password.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});