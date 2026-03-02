const spinner = document.getElementById("loading-spinner");
const searchBtn = document.getElementById("search-btn");
const countryInput = document.getElementById("country-input");
const errorDiv = document.getElementById("error-message");
const countryInfo = document.getElementById("country-info");
const bordersSection = document.getElementById("bordering-countries");

async function searchCountry(countryName) {
    if (!countryName) return;

    spinner.classList.remove("hidden");
    errorDiv.textContent = "";
    countryInfo.innerHTML = "";
    bordersSection.innerHTML = "";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        const country = data[0];

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital?.[0] ?? "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag" width="150">
        `;

        if (country.borders && country.borders.length > 0) {
            bordersSection.innerHTML = "<h3>Bordering Countries:</h3>";
            for (const code of country.borders) {
                try {
                    const borderResp = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                    const borderData = await borderResp.json();
                    const borderCountry = borderData[0];

                    const div = document.createElement("div");
                    div.classList.add("country-card");
                    div.style.width = "100px";
                    div.style.margin = "5px";
                    div.innerHTML = `
                        <p>${borderCountry.name.common}</p>
                        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag" width="80">
                    `;
                    bordersSection.appendChild(div);
                } catch (err) {
                    console.error("Border country fetch error:", err);
                }
            }
        } else {
            bordersSection.innerHTML = "<p>No bordering countries</p>";
        }

    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        spinner.classList.add("hidden");
    }
}

searchBtn.addEventListener("click", () => {
    searchCountry(countryInput.value.trim());
});

countryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchCountry(countryInput.value.trim());
    }
});
