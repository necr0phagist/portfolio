/* Custom cursor: terracotta dot + trailing ink ring with contextual states.
   - Default: dot + faint ring that trails the pointer.
   - Links/buttons: ring swells, dot shrinks.
   - [data-cursor="view"] zones (project artwork): ring becomes a filled
     disc with a "View" label.
   - Buttons get a subtle magnetic pull toward the pointer.
   Only activates on fine pointers (mouse/trackpad) when the user has NOT
   requested reduced motion. Touch, keyboard and reduced-motion users never
   see it and keep the native cursor. No dependencies; one rAF loop. */
(function () {
  if (typeof window === "undefined" || !window.matchMedia) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof requestAnimationFrame === "undefined") return;

  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");
  var ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");
  var disc = document.createElement("span");
  disc.className = "cursor-disc";
  var label = document.createElement("span");
  label.className = "cursor-label";
  label.textContent = "View";
  disc.appendChild(label);
  ring.appendChild(disc);
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.documentElement.classList.add("has-cursor");

  var x = -100, y = -100, rx = -100, ry = -100, shown = false;
  function show() {
    if (shown) return;
    shown = true;
    dot.classList.add("on");
    ring.classList.add("on");
  }
  function hide() {
    shown = false;
    dot.classList.remove("on");
    ring.classList.remove("on");
  }
  (function loop() {
    rx += (x - rx) * 0.3;
    ry += (y - ry) * 0.3;
    ring.style.transform = "translate(" + rx + "px," + ry + "px)";
    requestAnimationFrame(loop);
  })();

  var mag = null; // currently magnetised button
  function clearMag() {
    if (mag) {
      mag.style.transform = "";
      mag = null;
    }
  }

  document.addEventListener("mousemove", function (e) {
    x = e.clientX;
    y = e.clientY;
    show();
    dot.style.transform = "translate(" + x + "px," + y + "px)";

    var t = e.target && e.target.closest ? e.target.closest("a,button") : null;
    var view = e.target && e.target.closest ? e.target.closest('[data-cursor="view"]') : null;
    dot.classList.toggle("is-view", !!view);
    dot.classList.toggle("is-link", !view && !!t);
    ring.classList.toggle("is-view", !!view);
    ring.classList.toggle("is-link", !view && !!t);

    var btn = e.target && e.target.closest ? e.target.closest(".btn") : null;
    if (btn !== mag) {
      clearMag();
      mag = btn;
    }
    if (mag) {
      var r = mag.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height / 2);
      mag.style.transform =
        "translate(" + (dx * 0.12).toFixed(1) + "px," + (dy * 0.18).toFixed(1) + "px)";
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget) {
      hide();
      clearMag();
    }
  });
  document.addEventListener("mouseleave", function () {
    hide();
    clearMag();
  });
  window.addEventListener("blur", function () {
    hide();
    clearMag();
  });
})();
