/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "ff9ed2b3aa83f2ca46f9febbe9781413";
const generateButton = document.getElementById("generate");
const temperatureHTML = document.getElementById("temp");
const dateHTML = document.getElementById("date");
const contentHTML = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/**
 * @description - this function is invoked when the generate button is clicked.
 * It invokes all the functions in this code.
 */
const generateData = function () {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getCurrentTemperature(baseURL, zipCode, API_KEY).then((temperature) => {
    postData("/addData", {
      temperature: temperature,
      date: newDate,
      feelings: feelings,
    })
      .then(() => getData("/getData"))
      .then((data) => {
        updateUI(data);
        console.log(data);
      });
  });
};

/**
 * @description - fetches the current temperature from weather API
 * @param {string} baseURL - API base url
 * @param {string} zipCode - a valid zip code
 * @param {string} key - API personal key
 * @param {string} countryCode - a valid country code
 * @returns - current temperature
 */
const getCurrentTemperature = async function (
  baseURL,
  zipCode,
  key,
  countryCode = ""
) {
  const response = await fetch(
    `${baseURL}zip=${zipCode},${countryCode}&units=metric&appid=${key}`
  );

  try {
    const Weatherdata = await response.json();
    return Weatherdata.main.temp;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @description - posts an object to the app endpoint
 * @param {object} data - an object with three properties: temperature, date, feeling
 * @returns - the posted object
 */
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

/**
 * @description - updates the UI using user and API data
 * @param {object} data - an object with three properties: temperature, date, feeling
 */
const updateUI = async function (data) {
  temperatureHTML.innerHTML = `Temperature: ${data.temperature} C`;
  dateHTML.innerHTML = `Date: ${data.date}`;
  contentHTML.innerHTML = `Feeling: ${data.userResponse}`;
};

/**
 * @description - fetch the data from the app endpoint
 */
const getData = async function (url = "") {
  const request = await fetch(url);
  try {
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

generateButton.addEventListener("click", generateData);
