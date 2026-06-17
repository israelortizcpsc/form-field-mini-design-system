/* FIELD — interaction layer
   Keeps the system honest: validation, file naming, theme.
   All visual state is CSS; JS only toggles hooks + aria. */

(function () {
  "use strict";

  /* ---------- Theme toggle (respects saved + system preference) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");

  const stored = localStorage.getItem("field-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    themeBtn.setAttribute("aria-pressed", String(mode === "dark"));
    themeBtn.querySelector(".theme-toggle__label").textContent =
      mode === "dark" ? "Light theme" : "Dark theme";
  }
  themeBtn.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("field-theme", next);
  });

  /* ---------- File input: reflect the chosen filename ---------- */
  const fileInput = document.getElementById("resume");
  if (fileInput) {
    const label = fileInput.closest(".file");
    const nameEl = document.getElementById("resume-name");
    fileInput.addEventListener("change", function () {
      const file = fileInput.files && fileInput.files[0];
      if (file) {
        nameEl.textContent = file.name;
        label.classList.add("has-file");
      } else {
        nameEl.textContent = "No file selected";
        label.classList.remove("has-file");
      }
    });
  }

  /* ---------- Form validation (accessible error wiring) ---------- */
  const form = document.getElementById("demoForm");
  if (!form) return;
  const status = document.getElementById("formStatus");

  // Map each validated control to its error element.
  const validated = [
    { input: form.elements.fullName, error: "fullName-err" },
    { input: form.elements.email, error: "email-err" },
  ];

  function showError(input, errorId, show) {
    const field = input.closest(".field");
    const errEl = document.getElementById(errorId);
    field.classList.toggle("is-error", show);
    input.setAttribute("aria-invalid", String(show));
    errEl.hidden = !show;
  }

  // Validate on blur once the user has left a field.
  validated.forEach(function (v) {
    if (!v.input) return;
    v.input.addEventListener("blur", function () {
      showError(v.input, v.error, !v.input.checkValidity());
    });
    // Clear the error as soon as the input becomes valid again.
    v.input.addEventListener("input", function () {
      if (v.input.checkValidity()) showError(v.input, v.error, false);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let firstInvalid = null;

    validated.forEach(function (v) {
      if (!v.input) return;
      const ok = v.input.checkValidity();
      showError(v.input, v.error, !ok);
      if (!ok && !firstInvalid) firstInvalid = v.input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      status.textContent = "Please fix the highlighted fields.";
      status.className = "form__status is-bad";
    } else {
      status.textContent = "✓ Submitted — looks good.";
      status.className = "form__status is-ok";
    }
  });

  form.addEventListener("reset", function () {
    validated.forEach(function (v) {
      if (v.input) showError(v.input, v.error, false);
    });
    status.textContent = "";
    status.className = "form__status";
    const label = document.querySelector(".file");
    if (label) {
      label.classList.remove("has-file");
      const nameEl = document.getElementById("resume-name");
      if (nameEl) nameEl.textContent = "No file selected";
    }
  });
})();
