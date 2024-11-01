const INPUT_ELEM = document.querySelector(".search__input");
const BUTTON_ELEM = document.querySelector(".clear__button");
const IMAGE_ELEM = document.querySelector(".weather__img");
const ERROR_IMAGE_ELEM = document.querySelector(".error__image");
const TEMPERATURE_ELEM = document.querySelector(".weather__temperature");
const CITY_ELEM = document.querySelector(".city");
const COUNTRY_ELEM = document.querySelector(".country");
const DESCRIPTION_ELEM = document.querySelector(".weather__description");
const FOOTER_INFO = document.querySelector(".footer__info");
const HUMIDITY_ELEM = document.querySelector(".humidity");
const WIND_ELEM = document.querySelector(".wind");

function updateCountry(thCountriesApi, countryCode_In_WeatherApi) {
    const matchedCountryCode = thCountriesApi.filter(country => {
        const countryCode_In_CountriesApi = country.alpha2;
        return countryCode_In_CountriesApi === countryCode_In_WeatherApi;
    })
    COUNTRY_ELEM.textContent = matchedCountryCode[0].name;
}

function updateData(weather, countries) {
    showHiddenElements();

    const countriesCode_In_ThCountriesApi = countries;
    const countriesCode_In_WeatherApi = weather.sys.country;
    const iconApi = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

    IMAGE_ELEM.src = iconApi;
    IMAGE_ELEM.alt = `${weather.weather[0].main} weather picture`;
    TEMPERATURE_ELEM.textContent = `${Math.round(weather.main.temp).toString()} °C`;
    CITY_ELEM.textContent = weather.name + ",";
    updateCountry(countriesCode_In_ThCountriesApi, countriesCode_In_WeatherApi);
    DESCRIPTION_ELEM.textContent = weather.weather[0].description;
    HUMIDITY_ELEM.textContent = weather.main.humidity.toString() + "%";
    WIND_ELEM.textContent = `${weather.wind.speed.toString()} กม./ชม.`;
}

async function getData(city = "bangkok") {
    const weatherApiKey = "8ffffdc1db5f000776826bad8ba16c25";
    const weatherApi = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=th";
    const weatherResponse = await fetch(`${weatherApi}&q=${city}&appid=${weatherApiKey}`);
    if (weatherResponse.status === 404) return hideElements();
    const weatherData = await weatherResponse.json();

    const thCountriesApi = "../src/JSON/country-list-th.json";
    const countries = await fetch(thCountriesApi);
    const countriesData = await countries.json();

    updateData(weatherData, countriesData);
}

function showHiddenElements() {
    const elementsToShow = [
        IMAGE_ELEM,
        TEMPERATURE_ELEM,
        COUNTRY_ELEM,
        DESCRIPTION_ELEM,
        FOOTER_INFO
    ];
    
    elementsToShow.forEach(element => {
        element.classList.remove("hide");
    })

    ERROR_IMAGE_ELEM.classList.add("hide");
}

function hideElements() {
    const elementsToHide = [
        IMAGE_ELEM,
        TEMPERATURE_ELEM,
        COUNTRY_ELEM,
        DESCRIPTION_ELEM,
        FOOTER_INFO
    ];
    
    elementsToHide.forEach(element => {
        element.classList.add("hide");
    })

    ERROR_IMAGE_ELEM.classList.remove("hide");
    CITY_ELEM.textContent = "City not found";
}

function changeButtonIcon() {
    const magnifyingGlassIcon = document.querySelector(".fa-magnifying-glass");
    const clearInputIcon = BUTTON_ELEM;

    if (INPUT_ELEM.value === "") {
        clearInputIcon.classList.add("hide");
        magnifyingGlassIcon.classList.remove("hide");
        return
    }

    magnifyingGlassIcon.classList.add("hide");
    clearInputIcon.classList.remove("hide");
}

function clearInput() {
    INPUT_ELEM.value = "";
    changeButtonIcon();
}

function onKeyUp(event) {
    const inputText = INPUT_ELEM.value;

    if (event.key === "Enter" && inputText) {
        getData(inputText);
        clearInput();
    }
}

function run() {
    BUTTON_ELEM.addEventListener("click", clearInput);
    INPUT_ELEM.addEventListener("input", changeButtonIcon);
    INPUT_ELEM.addEventListener("keyup", onKeyUp);
    getData();
}

run();