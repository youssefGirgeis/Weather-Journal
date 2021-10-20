/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=&&appid=";
const API_KEY = "ff9ed2b3aa83f2ca46f9febbe9781413";
const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// const postData = async (url = "", data = {}) => {
//   console.log(data);
//   const response = await fetch(url, {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // Body data type must match "Content-Type" header
//     body: JSON.stringify(data),
//   });

//   try {
//     const newData = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// postData("/addMovie", { movie: "the matrix", score: 5 });
// postData("/addMovie", { movie: "Pitch Perfect", score: 4.5 });

// const getCurrentTemperature = function (zipcode, countryCode) {
//   fetch(
//     `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${countryCode}&appid=${API_KEY}`
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data.main.temp));
// };

// getCurrentTemperature("94040", "us");

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
  // temp.then((d) =>console.log({ tempertaure: d, feelings: feelings, date: newDate }));
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

// getCurrentTemperature("94040", API_KEY);

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
