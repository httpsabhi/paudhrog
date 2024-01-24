// preloader
window.addEventListener("load", () => {
  const loader = document.querySelector(".preloader");
  loader.classList.add("preloader-hidden");
  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  })
})

// Hamburger Menu
let menu = document.querySelector("#ham-menu");
let navbar = document.querySelector(".menu");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};


