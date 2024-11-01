const INPUT_ELEM = document.querySelector(".search__input");

function updateData(weather, countries) {
    console.log(weather);
    console.log(countries);
}

async function getData(city = "bangkok") {
    const weatherApiKey = "8ffffdc1db5f000776826bad8ba16c25";
    const weatherApi = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=th";
    const weatherResponse = await fetch(`${weatherApi}&q=${city}&appid=${weatherApiKey}`);
    if (weatherResponse.status === 404) return;
    const weatherData = await weatherResponse.json();

    const thCountriesApi = "../src/JSON/country-list-th.json";
    const countries = await fetch(thCountriesApi);
    const countriesData = await countries.json();

    updateData(weatherData, countriesData);
}

function clearInput() {
    INPUT_ELEM.value = "";
}

function onKeyUp(event) {
    const inputText = INPUT_ELEM.value;

    if (event.key === "Enter" && inputText) {
        getData(inputText);
        clearInput();
    }
}

function run() {
    INPUT_ELEM.addEventListener("keyup", onKeyUp);
    getData();
}

run();