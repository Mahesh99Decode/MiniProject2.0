/* =========================================
   KRISHIMITRA AI — UTILITIES
========================================= */

function getCurrentLanguage() {
  return localStorage.getItem("km_lang") || "en";
}

function setLanguage(lang) {
  localStorage.setItem("km_lang", lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {

  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach(element => {

    const key = element.dataset.translate;

    if (translations[lang] && translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });
}

function toggleMobileMenu() {

  const navMenu = document.querySelector(".nav-links");

  navMenu.classList.toggle("active");
}