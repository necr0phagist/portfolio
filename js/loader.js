/* Brand loader: AV mark draws in, dot pops, hairline sweeps, panel lifts.
   First view per session gets the full sequence (~1.1s); repeat views get a
   quick fade (.quick). Skipped entirely under prefers-reduced-motion.
   A CSS failsafe (loader-kill) hides the panel after 4s even if this
   script fails, and a hard cap below guarantees no visitor is ever trapped.
   Runs early in <body> (classic script, no dependencies). */
(function () {
  var loader = document.getElementById("loader");
  if (!loader) return;
  function kill() {
    if (loader.parentNode) loader.parentNode.removeChild(loader);
    else if (loader.remove) loader.remove();
  }
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    kill();
    return;
  }
  var seen = null;
  try {
    seen = window.sessionStorage.getItem("av-seen");
  } catch (e) {}
  var minWait = seen ? 300 : 1900;
  if (seen && loader.classList) loader.classList.add("quick");
  try {
    window.sessionStorage.setItem("av-seen", "1");
  } catch (e) {}
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    if (loader.classList) loader.classList.add("done");
    setTimeout(kill, 800);
  }
  var start = Date.now ? Date.now() : 0;
  function onReady() {
    var now = Date.now ? Date.now() : 0;
    setTimeout(finish, Math.max(0, minWait - (now - start)));
  }
  if (document.readyState === "complete") {
    onReady();
  } else {
    window.addEventListener("load", onReady);
    setTimeout(finish, 3500);
  }
})();
