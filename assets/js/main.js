/* Small enhancements. The page is fully readable with JS disabled — the only
   thing that hard-depends on it is the de-obfuscated email link. */
(function () {
  "use strict";

  /* -- Email ------------------------------------------------------------
     Assembled at runtime so the plain address never sits in the markup for
     naive scrapers, while still being selectable and copyable by people. */
  var user = ["anubhav"].join("");
  var host = ["umd", "edu"].join(".");
  var link = document.getElementById("email-link");
  var text = document.getElementById("email-text");
  if (link) {
    link.href = "mailto:" + user + "@" + host;
    if (text) text.textContent = user + "@" + host;
  }

  /* -- Footer year ----------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* -- Nav: hairline once you leave the hero --------------------------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onNavScroll = function () {
      nav.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });
  }

  /* -- Scroll-spy ------------------------------------------------------ */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__scrollspy")
  );
  var sections = spyLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Set();

    var atBottom = function () {
      var de = document.documentElement;
      return window.innerHeight + window.scrollY >= de.scrollHeight - 2;
    };

    var paint = function () {
      var current = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible.has(sections[i].id)) { current = sections[i].id; break; }
      }
      /* The observer band sits in the upper part of the viewport, so a final
         section shorter than the band can never reach it. If we are scrolled
         all the way down, the last section is the one being read. */
      if (!current && atBottom()) current = sections[sections.length - 1].id;

      spyLinks.forEach(function (a) {
        if (current && a.getAttribute("href") === "#" + current) {
          a.setAttribute("aria-current", "true");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      paint();
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
    /* atBottom() can become true without any intersection change. */
    window.addEventListener("scroll", paint, { passive: true });
  }

  /* The hero mosaic drifts via CSS animation (see .mosaic__track); it needs no
     JS, and `prefers-reduced-motion` parks it in the stylesheet. */
})();
