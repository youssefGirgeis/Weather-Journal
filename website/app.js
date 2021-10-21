/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=&&appid=";
const API_KEY = "ff9ed2b3aa83f2ca46f9febbe9781413";
const generateButton = document.getElementById("generate");
const temperatureHTML = document.getElementById("temp");
const dateHTML = document.getElementById("date");
const contentHTML = document.getElementById("content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generateButton.addEventListener("click", function () {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getCurrentTemperature(zipCode, API_KEY).then((temperature) => {
    postData("/addData", {
      temperature: temperature,
      date: newDate,
      feelings: feelings,
    }).then((data) => updateUI(data));
  });
});

const getCurrentTemperature = async function (zipCode, key, countryCode = "") {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${key}`
  );

  try {
    const Weatherdata = await response.json();
    return Weatherdata.main.temp;
  } catch (err) {
    console.log(err);
  }
};

const postData = async function (url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

const updateUI = async function (data) {
  temperatureHTML.innerHTML = data.temperature;
  dateHTML.innerHTML = data.date;
  contentHTML.innerHTML = data.userResponse;
};
