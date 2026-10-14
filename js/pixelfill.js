/* Pixel-block button fill (Heron-style, direction-aware).
   On hover/focus, discrete squares cascade in column by column starting from
   the side the pointer entered (left-to-right / right-to-left; keyboard
   focus defaults to left-to-right) until the button is a pure fill.
   The plain :hover background-color in CSS stays as the no-JS /
   reduced-motion / touch fallback. Skipped entirely under
   prefers-reduced-motion or coarse pointers. */
(function () {
  if (typeof window === "undefined" || !window.matchMedia) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CELL = 8; // target square size in px

  function prep(btn) {
    if (btn._pix) return btn._pix;
    var label = document.createElement("span");
    label.className = "btn-label";
    while (btn.firstChild) label.appendChild(btn.firstChild);
    var layer = document.createElement("span");
    layer.className = "pixelfill";
    layer.setAttribute("aria-hidden", "true");
    btn.appendChild(label);
    btn.appendChild(layer);
    var st = { btn: btn, layer: layer, timer: 0, cells: [], cols: 0 };
    btn._pix = st;
    return st;
  }

  function build(st) {
    var r = st.btn.getBoundingClientRect();
    var cols = Math.min(48, Math.max(4, Math.ceil(r.width / CELL)));
    var rows = Math.min(12, Math.max(3, Math.ceil(r.height / CELL)));
    if (st.cols === cols && st.cells.length === cols * rows) return;
    st.cols = cols;
    st.cells = [];
    st.layer.innerHTML = "";
    st.layer.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    st.layer.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
    for (var i = 0; i < cols * rows; i++) {
      var c = document.createElement("i");
      st.layer.appendChild(c);
      st.cells.push(c);
    }
  }

  function fill(st, rtl) {
    clearTimeout(st.timer);
    build(st);
    var cols = st.cols;
    var rows = st.cells.length / cols;
    var i = 0;
    var step = Math.max(10, Math.min(26, Math.floor(360 / cols)));
    (function next() {
      for (var r = 0; r < rows; r++) {
        var col = rtl ? cols - 1 - i : i;
        var cell = st.cells[r * cols + col];
        if (cell) cell.classList.add("on");
      }
      i++;
      if (i < cols) st.timer = setTimeout(next, step);
    })();
  }

  function clear(st) {
    clearTimeout(st.timer);
    for (var i = 0; i < st.cells.length; i++) st.cells[i].classList.remove("on");
  }

  function enteredFromRight(btn, e) {
    if (!e || typeof e.clientX !== "number") return false;
    var r = btn.getBoundingClientRect();
    return e.clientX > r.left + r.width / 2;
  }

  var btns = document.querySelectorAll(".btn");
  for (var b = 0; b < btns.length; b++) {
    (function (btn) {
      btn.addEventListener("mouseenter", function (e) {
        fill(prep(btn), enteredFromRight(btn, e));
      });
      btn.addEventListener("mouseleave", function () {
        if (btn._pix) clear(btn._pix);
      });
      btn.addEventListener("focus", function () {
        fill(prep(btn), false);
      });
      btn.addEventListener("blur", function () {
        if (btn._pix) clear(btn._pix);
      });
    })(btns[b]);
  }
})();
