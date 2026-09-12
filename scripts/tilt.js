/* ============ TILT 3D nos cards ============ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  function enableTilt(el, intensity) {
    var rafPending = false;

    function applyTilt(x, y) {
      var rect = el.getBoundingClientRect();
      var px = (x - rect.left) / rect.width - 0.5;
      var py = (y - rect.top) / rect.height - 0.5;
      var rotateX = (-py * intensity).toFixed(2);
      var rotateY = (px * intensity).toFixed(2);
      el.style.transition = "";
      el.style.transform =
        "perspective(700px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateZ(0)";
    }

    function reset() {
      el.style.transition = "transform 0.5s ease";
      el.style.transform = "";
      setTimeout(function () {
        el.style.transition = "";
      }, 500);
    }

    el.addEventListener("mousemove", function (e) {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        applyTilt(e.clientX, e.clientY);
        rafPending = false;
      });
    });

    el.addEventListener("mouseleave", reset);

    el.addEventListener(
      "touchmove",
      function (e) {
        if (!e.touches[0]) return;
        applyTilt(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true },
    );

    el.addEventListener("touchend", reset);
    el.addEventListener("touchcancel", reset);
  }

  /* Aplica tilt nos cards de skill (20 = intensidade forte, como no original) */
  document.querySelectorAll(".skill-card").forEach(function (el) {
    enableTilt(el, 20);
  });

  document.querySelectorAll(".contact-card").forEach(function (el) {
    enableTilt(el, 15);
  });
})();
