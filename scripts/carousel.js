/* ============ CARROSSEL ============ */
(function () {
  "use strict";

  var root = document.querySelector(".carousel");
  if (!root) return;

  var track = root.querySelector(".carousel-track");
  var viewport = root.querySelector(".carousel-viewport");
  var prev = root.querySelector(".carousel-arrow.prev");
  var next = root.querySelector(".carousel-arrow.next");
  if (!track || !viewport || !prev || !next) return;

  /* Duplica cards para loop infinito */
  Array.prototype.slice.call(track.children).forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  var offset = 0;
  var loopWidth = 0;
  var isHovering = false;
  var isDragging = false;
  var dragStartX = 0;
  var dragStartOffset = 0;
  var manualTimeout = null;
  var speed = 0.35;

  function measure() { loopWidth = track.scrollWidth / 2; }

  function wrap(v) {
    if (loopWidth === 0) return v;
    while (v <= -loopWidth) v += loopWidth;
    while (v > 0) v -= loopWidth;
    return v;
  }

  function tick() {
    if (!isHovering && !isDragging && !manualTimeout) {
      offset = wrap(offset - speed);
      track.style.transform = "translateX(" + offset + "px)";
    }
    requestAnimationFrame(tick);
  }

  function jump(dir) {
    offset = wrap(offset + dir * 340);
    track.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = "translateX(" + offset + "px)";
    clearTimeout(manualTimeout);
    manualTimeout = setTimeout(function () {
      track.style.transition = "none";
      manualTimeout = null;
    }, 510);
  }

  prev.addEventListener("click", function () { jump(1); });
  next.addEventListener("click", function () { jump(-1); });

  root.addEventListener("mouseenter", function () { isHovering = true; });
  root.addEventListener("mouseleave", function () { isHovering = false; });

  /* Drag / touch */
  viewport.addEventListener("pointerdown", function (e) {
    if (e.target.closest("button, a")) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartOffset = offset;
    track.style.transition = "none";
    try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
  });
  viewport.addEventListener("pointermove", function (e) {
    if (!isDragging) return;
    var delta = e.clientX - dragStartX;
    offset = wrap(dragStartOffset + delta);
    track.style.transform = "translateX(" + offset + "px)";
  });
  viewport.addEventListener("pointerup", function () { isDragging = false; });
  viewport.addEventListener("pointercancel", function () { isDragging = false; });

  window.addEventListener("resize", measure);
  setTimeout(measure, 500);
  measure();
  requestAnimationFrame(tick);
})();