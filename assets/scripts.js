// assets/scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  /* ===============================
     THEME TOGGLE (LIGHT / DARK)
     =============================== */

  function applyTheme(theme) {
    const normalized = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalized);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = normalized === "light" ? "☀️" : "🌙";
    }
    localStorage.setItem("theme", normalized);
  }

  // Decide initial theme
  const storedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ===============================
     BACK TO TOP BUTTON
     =============================== */

  const backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("type", "button");
  backToTopBtn.setAttribute("aria-label", "Back to top");
  backToTopBtn.innerHTML = "↑";
  document.body.appendChild(backToTopBtn);

  function updateBackToTopVisibility() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("back-to-top--visible");
    } else {
      backToTopBtn.classList.remove("back-to-top--visible");
    }
  }

  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===============================
     SCROLL REVEAL ANIMATIONS
     =============================== */

  const revealEls = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: if no IntersectionObserver, just show everything
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
