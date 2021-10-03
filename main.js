let countryInput = document.getElementById("country-input");
let infoDivHeader = document.getElementById("country-info-header");
let infoDivBody = document.getElementById("country-info-body");


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
        clearResultsDiv();

        let errorHeaderNode = document.createTextNode("Error");
        let errorHeaderText = document.createElement("h2");
        errorHeaderText.appendChild(errorHeaderNode);
        infoDivHeader.appendChild(errorHeaderText);

        let errorNode = document.createTextNode("Nothing was entered in the searchbar or the country you were looking for was not found.");
        let errorText = document.createElement("p");
        errorText.appendChild(errorNode);
        infoDivBody.appendChild(errorText);
    }
    countryInput.value = "";
}

// Function that prints the information from the specified country
function printCountryInformation(data) {
    if (data !== null) {
        const { name, population, region, capital, currencies, languages, flag } = data;
        let generalInfo = name + " is situated in " + region + ". It has a population of " + population + " people.";
        let capitalInfo = "The capital is " + capital + ".";
        let currencyInfo = getCurrencyString(currencies);
        let langInfo = getLangString(languages);
        let infoList = [ generalInfo, capitalInfo, currencyInfo, langInfo ] ;

        clearResultsDiv();

        let flagImg = document.createElement("img");
        flagImg.id = "flag-img";
        flagImg.src = flag;
        infoDivHeader.appendChild(flagImg);

        let countryName = document.createElement("h2");
        let nameNode = document.createTextNode(name);
        countryName.appendChild(nameNode);
        infoDivHeader.appendChild(countryName);

        let infoText = document.createElement("p");
        infoList.map((info) => {
            let lineText = document.createTextNode(info);
            infoText.appendChild(lineText);
            infoText.appendChild(document.createElement("br"));
        });
        infoDivBody.appendChild(infoText);
    }
}

// Function that gets the string for all currencies used by a country
function getCurrencyString(currencies) {
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
    return currencyString;
}

// Function that gets the string for all spoken languages
function getLangString(languages) {
    let languageString = "They speak ";
    if (languages.length === 1) {
        languageString += languages[0].name + "."
    } else {
        for (let i = 0; i < languages.length; i++) {
            if (i + 1 === languages.length) {
                languageString += languages[i].name + "."
            } else if (i === languages.length - 2) {
                languageString += languages[i].name + " and "
            } else {
                languageString += languages[i].name + ", "
            }
        }
    }
    return languageString;
}


// Loads functionality of buttons etc.
function loadFunctionality() {
    document.getElementById("search-button").onclick = () => { getCountryInformation(countryInput.value) };
    countryInput.addEventListener("keypress", (e) => {
        if (e.code === "Enter") {
            getCountryInformation(countryInput.value);
        }
    });
}

// Clears result div
function clearResultsDiv() {
    while (infoDivHeader.firstChild) {
        infoDivHeader.removeChild(infoDivHeader.lastChild);
    }

    while (infoDivBody.firstChild) {
        infoDivBody.removeChild(infoDivBody.lastChild);
    }

}