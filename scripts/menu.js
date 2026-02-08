const btnMobile = document.querySelector(".menu-icon");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();

  const nav = document.querySelector(".menu-mobile");
  nav.classList.toggle("active");
}

btnMobile.addEventListener("click", toggleMenu);

const themeToggle = document.querySelectorAll(".theme-mode");
const body = document.body;

const sunIconPath = "assets/icons/sun.svg";
const moonIconPath = "assets/icons/moon.svg";

//Troca tema
function trocarTema(tipo) {
  if (tipo === true) {
    console.log("Tema claro ativado");
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    console.log("Tema escuro ativado");
  }

  const iconImages = document.querySelectorAll(".theme-icon img");

  iconImages.forEach((img) => {
    const newSrc = tipo ? sunIconPath : moonIconPath;
    img.src = newSrc + "?t=" + new Date().getTime(); // Adiciona ?t=123456789
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
