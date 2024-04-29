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
  Peach: "peach",
  Tomato: "tomato",
  Wheat: "wheat",
};

Object.keys(plants).forEach((key) => {
  let option = document.createElement("option");
  option.value = plants[key];
  option.text = key;
  select.add(option);
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

// Accuracy Bar
function progressBar(progressVal, totalPercentageVal = 100) {
  const strokeVal = (4.64 * 100) / totalPercentageVal;
  $(".progress-circle-prog").css("stroke-dasharray", progressVal * strokeVal + " 999");
  const el = $(".progress-text");
  const from = el.data("progress");
  el.data("progress", progressVal);
  const start = new Date().getTime();

  setTimeout(function () {
    const now = new Date().getTime() - start;
    const progress = now / 700;
    el.html((progressVal / totalPercentageVal) * 100 + "%");
    if (progress < 1) setTimeout(arguments.callee, 10);
  }, 10);
}

// Display Result
function predict() {
  const formData = new FormData($("#image-form")[0]);
  // console.log(formData);
  $("#result").html("");
  $("#predict-loader").show();
  $.ajax({
    url: "/result",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      $("#predict-loader").hide();
      $("#result").html(response.result[0]);
      // console.log(response);
      progressBar(response.result[1].toFixed(2), 100);
    },
    error: function (xhr, status, error) {
      $("#predict-loader").hide();
      alert(
        "An error occurred while processing the request. Please try again later."
      );
    },
  });
}

// Display Uploaded Image
let InputFile = document.getElementById("image-upload");
let ImageUpload = document.getElementById("uploaded-image");

InputFile.addEventListener("change", function() {
  if (this.files && this.files[0]) {
    ImageUpload.src = URL.createObjectURL(this.files[0]);
  }
});

