/* =========================================
<<<<<<< HEAD
   KRISHIMITRA AI — UTILITIES
========================================= */

=======
   KRISHIMITRA AI — CORE UTILITIES
========================================= */

/**
 * Check if a user is currently logged in
 */
function isUserLoggedIn() {
  const token = localStorage.getItem("krishimitra_token");
  return !!(token && token.trim() !== "");
}

const protectedFeaturePages = new Set([
  "dashboard.html",
  "recommendation.html",
  "monitoring.html",
  "simulation.html",
  "schemes.html",
  "alerts.html",
  "profile.html"
]);

function getProtectedFeatureUrl(url) {
  const page = url.pathname.split("/").pop().toLowerCase();
  return protectedFeaturePages.has(page) ? url : null;
}

function redirectToLogin(returnUrl) {
  const loginUrl = new URL("login.html", window.location.href);
  loginUrl.searchParams.set("reason", "auth-required");
  if (returnUrl) {
    loginUrl.searchParams.set("returnTo", `${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`);
  }
  window.location.replace(loginUrl.href);
}

/**
 * Require an authenticated session for feature pages and their navigation links.
 */
function enforceFeatureAuthentication() {
  const currentFeature = getProtectedFeatureUrl(new URL(window.location.href));
  if (currentFeature && !isUserLoggedIn()) {
    redirectToLogin(currentFeature);
  }

  document.addEventListener("click", event => {
    if (isUserLoggedIn()) return;

    const link = event.target.closest("a[href]");
    if (!link) return;

    const featureUrl = getProtectedFeatureUrl(new URL(link.href, window.location.href));
    if (!featureUrl) return;

    event.preventDefault();
    redirectToLogin(featureUrl);
  });
}

/**
 * Universal Sidebar and Navbar User Session Synchronization
 * Automatically updates sidebar bottom name, username, and avatar to match the logged-in user
 */
async function syncUserSidebarAndNav() {
  const email = localStorage.getItem("krishimitra_user_email");
  const token = localStorage.getItem("krishimitra_token");
  let savedName = localStorage.getItem("krishimitra_user_name");
  let savedUsername = localStorage.getItem("krishimitra_username");

  // Immediate fast-render from localStorage if available
  if (savedName) {
    const sbName = document.getElementById("sidebarUserName");
    if (sbName) sbName.innerText = savedName;
  }
  if (savedUsername) {
    const sbUser = document.getElementById("sidebarUserEmail");
    if (sbUser) sbUser.innerText = `@${savedUsername}`;
  }

  // Fetch verified profile from MongoDB backend
  if (email || token) {
    try {
      let user = null;
      if (token) {
        const authRes = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null);
        if (authRes && authRes.ok) {
          const authData = await authRes.json();
          if (authData.success && authData.user) user = authData.user;
        }
      }

      if (!user && email) {
        const userRes = await fetch(`http://localhost:5000/api/users/profile/${email}`).catch(() => null);
        if (userRes && userRes.ok) {
          user = await userRes.json();
        }
      }

      if (user && user.name) {
        localStorage.setItem("krishimitra_user_name", user.name);
        if (user.username) localStorage.setItem("krishimitra_username", user.username);

        // Update Sidebar Elements
        const sbName = document.getElementById("sidebarUserName");
        if (sbName) sbName.innerText = user.name;

        const sbUser = document.getElementById("sidebarUserEmail");
        if (sbUser) sbUser.innerText = `@${user.username || "farmer"}`;

        const sbAvatar = document.getElementById("sidebarAvatar");
        if (sbAvatar && user.photoURL) sbAvatar.src = user.photoURL;

        // Update Topbar / Greeting if on Dashboard
        const topGreeting = document.getElementById("welcomeFarmerText");
        if (topGreeting) {
          const hour = new Date().getHours();
          let greeting = "Good Morning";
          if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
          else if (hour >= 17) greeting = "Good Evening";
          topGreeting.innerHTML = `${greeting}, ${user.name} <span class="wave-emoji">👋</span>`;
        }

        const topAvatar = document.getElementById("dashboardProfileAvatar");
        if (topAvatar && user.photoURL) topAvatar.src = user.photoURL;
      }
    } catch (err) {
      console.warn("User sync notice:", err.message);
    }
  }

  // Sync Navbar state
  syncNavbarAuthUI();
}

/**
 * Update Navbar Auth Section (Login vs Farmer Name & Sign Out)
 */
function syncNavbarAuthUI() {
  const navAuth = document.getElementById("navAuthSection");
  if (!navAuth) return;

  const loggedIn = isUserLoggedIn();
  const userName = localStorage.getItem("krishimitra_user_name") || "Farmer";
  const loginBtn = document.getElementById("navLoginBtn");

  if (loggedIn) {
    if (loginBtn) loginBtn.style.display = "none";

    let existingGroup = document.getElementById("navUserPillGroup");
    if (!existingGroup) {
      existingGroup = document.createElement("div");
      existingGroup.id = "navUserPillGroup";
      existingGroup.style.display = "inline-flex";
      existingGroup.style.alignItems = "center";
      existingGroup.style.gap = "10px";

      existingGroup.innerHTML = `
        <a href="profile.html" class="btn-secondary" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; font-weight: 600;">
          <span>👤</span> ${userName}
        </a>
        <button type="button" onclick="handleGlobalSignOut()" class="btn-secondary" style="cursor: pointer; color: #DC2626; border-color: rgba(220, 38, 38, 0.3); background: rgba(220, 38, 38, 0.08); font-weight: 600; padding: 8px 14px;">
          <span>🚪</span> Sign Out
        </button>
      `;
      navAuth.appendChild(existingGroup);
    }
  } else {
    // User is logged out
    const existingGroup = document.getElementById("navUserPillGroup");
    if (existingGroup) existingGroup.remove();
    if (loginBtn) loginBtn.style.display = "inline-block";

  }
}

/**
 * Universal Global Sign Out Handler
 */
window.handleGlobalSignOut = function() {
  if (confirm("Are you sure you want to sign out of KrishiMitra AI?")) {
    localStorage.removeItem("krishimitra_token");
    localStorage.removeItem("krishimitra_user_id");
    localStorage.removeItem("krishimitra_user_email");
    localStorage.removeItem("krishimitra_user_name");
    localStorage.removeItem("krishimitra_username");
    window.location.href = "login.html";
  }
};

/**
 * Universal Component Loader
 * Automatically triggers auth and UI synchronization after loading HTML snippets
 */
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (response.ok) {
      const data = await response.text();
      const target = document.getElementById(id);
      if (target) {
        target.innerHTML = data;

        if (id === "sidebar") {
          syncUserSidebarAndNav();
          // Highlight active link
          const currentPath = window.location.pathname;
          target.querySelectorAll(".sidebar-nav a").forEach(link => {
            const href = link.getAttribute("href");
            if (href && currentPath.includes(href)) {
              link.classList.add("active");
            }
          });
        }

        if (id === "navbar") {
          syncUserSidebarAndNav();
        }
      }
    }
  } catch (err) {
    console.warn(`Could not load ${file}:`, err.message);
  }
}

// Translations & Language Support
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
function getCurrentLanguage() {
  return localStorage.getItem("km_lang") || "en";
}

function setLanguage(lang) {
  localStorage.setItem("km_lang", lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {
<<<<<<< HEAD

  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach(element => {

    const key = element.dataset.translate;

    if (translations[lang] && translations[lang][key]) {
=======
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach(element => {
    const key = element.dataset.translate;
    if (typeof translations !== "undefined" && translations[lang] && translations[lang][key]) {
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
      element.innerText = translations[lang][key];
    }
  });
}

function toggleMobileMenu() {
<<<<<<< HEAD

  const navMenu = document.querySelector(".nav-links");

  navMenu.classList.toggle("active");
}
=======
  const navMenu = document.querySelector(".nav-links");
  if (navMenu) navMenu.classList.toggle("active");
}

// Enforce page access immediately and protect dynamically loaded navigation links.
enforceFeatureAuthentication();
document.addEventListener("DOMContentLoaded", () => {
  syncUserSidebarAndNav();
});
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
