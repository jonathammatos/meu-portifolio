/* ============ THEME MODE ============ */
/* O tema já é aplicado no <head> do HTML (inline) para evitar flash.
   Aqui só ligamos/desligamos ao clicar no botão. */

(function () {
  "use strict";

  var root = document.documentElement; // <html>

  function setTheme(isLight) {
    root.classList.toggle("light", isLight);
    try {
      localStorage.setItem("tema", isLight ? "light" : "dark");
    } catch (e) {}
  }

  function init() {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isLight = !root.classList.contains("light");
      setTheme(isLight);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();