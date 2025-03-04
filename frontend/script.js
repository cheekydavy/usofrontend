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
});
