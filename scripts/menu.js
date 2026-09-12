/* ============ MENU MOBILE + SCROLL SPY ============ */
(function () {
  "use strict";

  /* --- Menu mobile --- */
  var hamburger = document.querySelector(".hamburger");
  var menu = document.querySelector(".menu-mobile");
  var backdrop = document.querySelector(".menu-backdrop");

  if (hamburger && menu) {
    var toggle = function (open) {
      hamburger.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      if (backdrop) backdrop.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    hamburger.addEventListener("click", function () {
      toggle(!menu.classList.contains("is-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () { toggle(false); });
    }

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        toggle(false);
      }
    });
  }

  /* --- Scroll spy --- */
  var sections = document.querySelectorAll("section[id], footer[id]");
  var links = document.querySelectorAll(".menu-list a.link, .menu-mobile a.link");

  if (!sections.length || !("IntersectionObserver" in window)) return;

  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          links.forEach(function (l) {
            l.classList.toggle(
              "is-active",
              l.getAttribute("href") === "#" + id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (s) { spy.observe(s); });
})();