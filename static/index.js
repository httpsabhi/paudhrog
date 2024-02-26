// preloader
window.addEventListener("load", () => {
  const loader_container = document.querySelector(".loader-container");
  const loader = document.querySelector(".preloader");
  loader.classList.add("preloader-hidden");
  loader.addEventListener("transitionend", () => {
    if (document.body.contains(loader_container)) {
      document.body.removeChild(loader_container);
    }
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
  Cherry: "cherry",
  Grapes: "grape",
  Tomato: "tomato",
  Wheat: "wheat",
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

// Display Result
function predict(){
  const formData = new FormData($('#image-form')[0]);
  $('#result').html("");
  $('#predict-loader').show();
  $.ajax({
    url: '/result',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(response){
      $('#predict-loader').hide();
      $('#result').html(response.result);
    },
    error: function(error){
      $('#predict-loader').hide();
      console.log(error);
    }
  });
}