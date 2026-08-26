(function () {
  "use strict";

  // PLACEHOLDER: create a free form at https://formspree.io, then paste your
  // endpoint here, e.g. "https://formspree.io/f/YOUR_FORMSPREE_ID".
  // Leave empty to fall back to opening the visitor's email app.
  var FORMSPREE_ENDPOINT = "";

  var PLACEHOLDER_EMAIL = "YOUR_EMAIL"; // PLACEHOLDER: replace with your email

  // --- Mobile navigation ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // --- Footer year ---
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // --- Contact form ---
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    function show(type, msg) {
      status.className = "form-status show " + type;
      status.textContent = msg;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        show("error", "Please fill in your name, email, and message.");
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        show("error", "Please enter a valid email address.");
        return;
      }

      if (!FORMSPREE_ENDPOINT) {
        window.location.href =
          "mailto:" + PLACEHOLDER_EMAIL +
          "?subject=" + encodeURIComponent("Portfolio inquiry from " + name) +
          "&body=" + encodeURIComponent(message + "\n\nReply to: " + email);
        show(
          "success",
          "Opening your email app… If nothing happens, email me directly at " + PLACEHOLDER_EMAIL + "."
        );
        form.reset();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            show("success", "Thanks, " + name + "! Your message was sent — I usually reply within 24 hours.");
            form.reset();
          } else {
            throw new Error("Send failed");
          }
        })
        .catch(function () {
          show("error", "Something went wrong sending your message. Please email me directly instead.");
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Send message"; }
        });
    });
  }
})();
