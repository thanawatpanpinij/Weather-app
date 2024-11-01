const INPUT_ELEM = document.querySelector(".search__input");
const IMAGE_ELEM = document.querySelector(".weather__img");
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