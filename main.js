// Function that returns the information of the specified country
async function getCountryInformation(country) {
    try {
        let uriPath = "https://restcountries.com/v2/name/";
        uriPath += country;
        const information = await axios.get(uriPath);
        console.log(information.data[0]);
        printCountryInformation(information.data[0]);
    } catch (e) {
        console.log(e);
    }
}

// Function that prints the information from the specified country
function printCountryInformation(data) {
    if (data !== null) {
        const { name, population, region, capital, currencies } = data;
        let generalInfo = name + " is situated in " + region + ". It has a population of " + population + " people.";
        let capitalInfo = "The capital is " + capital + ".";
        console.log(generalInfo);
        console.log(capitalInfo);
        printCurrencyTypes(currencies);
    }
}

// Function that prints all currencies used by a country
function printCurrencyTypes(currencies) {
    let currencyString = "And you can pay with ";
    if (currencies.length === 1) {
        currencyString += currencies[0].name + "'s."
    } else {
        for (let i = 0; i < currencies.length; i++) {
            if (i + 1 === currencies.length) {
                currencyString += currencies[i].name + "'s."
            } else {
                currencyString += currencies[i].name + "'s and "
            }
        }
    }
    console.log(currencyString);
}


// Loads functionalty of buttons etc.
function loadFunctionality() {
    document.getElementById("search-button").onclick = () => { getCountryInformation("belgium") };
}