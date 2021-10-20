/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=&&appid=";
const API_KEY = "ff9ed2b3aa83f2ca46f9febbe9781413";
const generateButton = document.getElementById("generate");

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
    });
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
    console.log(newData);
    return newData;
  } catch (err) {
    console.log(err);
  }
};
