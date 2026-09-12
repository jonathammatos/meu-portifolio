/* ============ REVEAL ON SCROLL (in/out) ============ */
(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var siblings = Array.prototype.slice.call(
            entry.target.parentElement.querySelectorAll(".reveal"),
          );
          var idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(idx * 80, 500) + "ms";
          entry.target.classList.add("is-visible");
          observer.unobserve(
            entry.target,
          ); /* ⬅️ NOVA LINHA: para de observar */
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "-40px 0px -40px 0px",
    },
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
