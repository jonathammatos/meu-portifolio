const btnMobile = document.querySelector(".menu-icon");
const btnIcon = btnMobile.querySelector("img");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.querySelector(".menu-mobile");
  const isOpen = nav.classList.toggle("active");

  const open = "assets/icons/menu.svg";
  const close = "assets/icons/close.svg";

  const newSrc = isOpen ? close : open;

  btnIcon.style.opacity = "0";
  btnIcon.style.transform = "scale(0.85)";

  setTimeout(() => {
    btnIcon.src = newSrc + "?t=" + Date.now();
    btnIcon.style.opacity = "1";
    btnIcon.style.transform = "scale(1)";
  }, 200);
}

btnMobile.addEventListener("touchstart", toggleMenu);

const themeToggle = document.querySelectorAll(".theme-mode");
const body = document.body;

const sunIconPath = "assets/icons/sun.svg";
const moonIconPath = "assets/icons/moon.svg";
//Troca tema
function trocarTema(tipo) {
  if (tipo === true) {
    body.classList.add("light");
  } else {
    body.classList.remove("light");
  }

  const iconImages = document.querySelectorAll(".theme-icon img");

  iconImages.forEach((img) => {
    const newSrc = tipo ? sunIconPath : moonIconPath;
    img.src = newSrc + "?t=" + new Date().getTime();
  });
}

const temasalvo = localStorage.getItem("tema");
trocarTema(temasalvo === "light");

themeToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    const islight = body.classList.toggle("light");
    localStorage.setItem("tema", islight ? "light" : "dark");
    trocarTema(islight);
  });
});
