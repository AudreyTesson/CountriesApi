/**
 * Charge les infos du pays recherché depuis une API.
 * @param {string} searchedValue
 * @returns {array} les infos du pays
 */
async function getCountry(searchedValue) {

    const response = await fetch(
        "https://restcountries.com/v3.1/name/" + searchedValue
    ); 
    console.log(response);

    const data = await response.json();
    console.log(data);

    const countryResult = [];

    if (response.status === 200) {
        for (const countryFromAPI of data) {

        const country = {
            name: countryFromAPI.translations.fra.common,
            flag: countryFromAPI.flags.svg,
        };

        countryResult.push(country);
        }
    }

    return countryResult;
}

/**
 * Fonction appelée lors de la soumission du formulaire
 */
async function handleLoadCountries(event) {
    event.preventDefault(); 

    document.querySelector(".country-list").textContent = "";

    const searchValue = document.querySelector("input[name='search']").value;

    const countries = await getCountry(searchValue);

    if (countries.length === 0) {
        alert("Nom de pays non reconnu, insérez un nom de pays en anglais");
    } else {
        for (const country of countries) {
        insertCountryInDom(country);
        }
    }
}

/**
   * Insérer un pays dans la page.
   *
   * @param {Object} country
   */
function insertCountryInDom(country) {
    const countryElement = document.createElement("li");

    const flagElement = document.createElement("img");

    flagElement.src = country.flag;

    countryElement.append(flagElement);

    const nameElement = document.createElement("span");

    nameElement.textContent = country.name;

    countryElement.append(nameElement);

    document.querySelector(".country-list").append(countryElement);
}

document
    .querySelector(".search-form")
    .addEventListener("submit", handleLoadCountries); 
