let countries;


// Get data for all countries
async function getCountryData() {
    try {
        countries = await axios.get("https://restcountries.com/v2/all");
    } catch (e) {
        console.log(e);
    }
}

// Fill country list
function populateList() {
    let listDiv = document.getElementById("list-div");

    let columnNumber = 1;

    for (let i = 0; i < countries.data.length; i++) {
        const { name, flag } = countries.data[i];
        let countryDiv = document.createElement("div");
        countryDiv.className = "country-divs"

        let countryFlag = document.createElement("img");
        countryFlag.className = "country-flags"
        countryFlag.src = flag;
        countryDiv.appendChild(countryFlag);

        let countryName = document.createElement("label");
        let countryNameText = document.createTextNode(name);
        countryName.appendChild(countryNameText);
        countryName.className = "country-labels";
        countryName.style.color = deterColor(countries.data[i]);
        countryName.addEventListener("click", (e) => {
            console.log(e);
            showPopulation(e.target.innerText);
        });

        countryDiv.appendChild(countryName);

        let populationLabel = document.createElement("label");
        let populationText = document.createTextNode("Population:" + countries.data[i].population);
        populationLabel.appendChild(populationText);
        populationLabel.id = name.toLowerCase() + "Population";
        populationLabel.className = "population-labels";
        populationLabel.hidden = true;
        countryDiv.appendChild(populationLabel);

        if (columnNumber === 1) {
            countryDiv.style.gridColumn = columnNumber;
            columnNumber++;
        } else if (columnNumber === 2) {
            countryDiv.style.gridColumn = columnNumber;
            columnNumber++;
        } else {
            countryDiv.style.gridColumn = columnNumber;
            columnNumber = 1;
        }

        listDiv.appendChild(countryDiv);
    }
}


// Function to get all data and fill the view
async function init() {
    await getCountryData();
    populateList();
}


// Determines the color the country name will get
function deterColor(country) {
    const { region, subregion } = country;

    if (subregion === "South America") {
        return "#80C18C";
    } else if (region === "Africa") {
        return "#5B76BC";
    } else if (region === "Asia") {
        return "#C2575E";
    } else if (region === "Europe") {
        return "#F9D458";
    } else if (region === "Oceania") {
        return "#9B5AB5";
    } else if (region === "Americas") {
        return "#598051";
    } else {
        return "#000000";
    }
}


// Show / Hide country population
function showPopulation(countryName) {
    let country = countries.data.find(({ name }) => name === countryName);
    let populationLabel = document.getElementById(country.name.toLowerCase() + "Population");
    if (populationLabel.hidden) {
        populationLabel.hidden = false;
    } else {
        populationLabel.hidden = true;
    }
}