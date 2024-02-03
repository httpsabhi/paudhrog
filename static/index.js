<<<<<<< HEAD
// preloader
window.addEventListener("load", () => {
  const loader = document.querySelector(".preloader");
  loader.classList.add("preloader-hidden");
  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

const apiKey = "dcfb40e6e983dd202968bc3b31b1cec1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Hamburger Menu
let menu = document.querySelector("#ham-menu");
let navbar = document.querySelector(".menu");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

// Plant Option
const select = document.getElementById("plant");
const plants = {
  Apple: "apple",
  Tomato: "tomato",
  Wheat: "wheat"
}

Object.keys(plants).forEach(key => {
  let option = document.createElement("option")
  option.value = plants[key]
  option.text = key
  select.add(option)
});

// Geolocation
const weather = document.querySelector(".weather");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  fetch(apiUrl + `&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      const temp = document.querySelector(".temp");
      const tempMobile = document.querySelector(".temp-mobile");
      const weatherIcon = document.querySelector(".weather-icon");
      const weatherIconMobile = document.querySelector(".weather-icon-mobile");
      temp.innerHTML = Math.round(data.main.temp) + "° C";
      tempMobile.innerHTML = Math.round(data.main.temp) + "° C";
      weatherIconMobile.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    });
}

getLocation();
=======
// preloader
window.addEventListener("load", () => {
  const loader = document.querySelector(".preloader");
  loader.classList.add("preloader-hidden");
  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

const apiKey = "dcfb40e6e983dd202968bc3b31b1cec1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Hamburger Menu
let menu = document.querySelector("#ham-menu");
let navbar = document.querySelector(".menu");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

// Plant Option
const select = document.getElementById("plant");
const plants = {
  Apple: "apple",
  Tomato: "tomato",
  Wheat: "wheat"
}

Object.keys(plants).forEach(key => {
  let option = document.createElement("option")
  option.value = plants[key]
  option.text = key
  select.add(option)
});

// Geolocation
const weather = document.querySelector(".weather");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No geolocation");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  fetch(apiUrl + `&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      const temp = document.querySelector(".temp");
      const tempMobile = document.querySelector(".temp-mobile");
      const weatherIcon = document.querySelector(".weather-icon");
      const weatherIconMobile = document.querySelector(".weather-icon-mobile");
      temp.innerHTML = Math.round(data.main.temp) + "° C";
      tempMobile.innerHTML = Math.round(data.main.temp) + "° C";
      weatherIconMobile.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    });
}

getLocation();
>>>>>>> 4bb03e240885333305275665c89b401264a6b6ea
