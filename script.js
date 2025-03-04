document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.getElementById("country");
    const countryCodeInput = document.getElementById("countryCode");

    const countries = { "Kenya": "254", "USA": "1", "UK": "44" };

    for (const country in countries) {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }

    countrySelect.addEventListener("change", () => {
        countryCodeInput.value = countries[countrySelect.value];
    });

    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
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
                countryCode: document.getElementById("countryCode").value
            })
        });

        const data = await res.json();
        if (res.ok) window.location.href = "https://uso-red.vercel.app";
        else alert(data.msg);
    });
});
