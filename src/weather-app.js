const INPUT_ELEM = document.querySelector(".search__input");

function getData(city = "bangkok") {
    console.log(city);
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