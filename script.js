const spinner = document.getElementById("loading-spinner");
const searchBtn = document.getElementById("search-btn");
const countryInput = document.getElementById("country-input");
async function searchCountry(countryName) {
    try {
        // Show loading spinner
        spinner.classList.remove("hidden");
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok){
            throw new Error("Country not found");
        }
        const data = await response.json();
        const country = data[0];
        // Update DOM
        document.getElementById("country-info").innerHTML = 
            `<h2> ${country.name.common} </h2>`
            `<p><strong>Capital:</strong> ${country.capital[0] : "N/A" }</p>`
            `<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>`
            `<p><strong>Region:</strong> ${country.region}</p>`
            `<img src="${country.flags.svg}" alt="${country.name.common} flag" width "150">
            `;
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
    } finally {
        spinner.classList.add("hidden");
    }
}

// Event listeners
searchBtn.addEventListener("click, () =>{
     searchCountry(country.Input.value.trim());                      
});

countryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        searchCountry(countryInput.value.trim());
    }
});
