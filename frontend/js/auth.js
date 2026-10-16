/* =========================================
   KRISHIMITRA AI — MONGODB AUTHENTICATION
========================================= */

const AUTH_CONFIG = {
  API_BASE_URL: "http://localhost:5000/api/auth",
  REGEX: {
    // Username: 3 to 20 alphanumeric characters or underscore
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
    // Email: Standard RFC email format
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Password: At least 6 characters with at least one letter and one number
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d).{6,50}$/,
    // Phone: Optional 10-digit format
    PHONE: /^([0-9]{10}|[+]?[0-9\s-]{7,15})$/
  }
};

/**
 * Toggle Password Visibility
 */
function togglePassword(toggleElement) {
  const input = toggleElement.parentElement.querySelector("input");
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    toggleElement.innerHTML = "🙈";
  } else {
    input.type = "password";
    toggleElement.innerHTML = "👁️";
  }
}

/**
 * Display inline auth message
 */
function showAuthMessage(form, message, isError = true) {
  let msgBox = form.querySelector(".auth-feedback-box");
  if (!msgBox) {
    msgBox = document.createElement("div");
    msgBox.className = "auth-feedback-box";
    form.insertBefore(msgBox, form.firstChild);
  }

  msgBox.style.padding = "10px 14px";
  msgBox.style.borderRadius = "8px";
  msgBox.style.marginBottom = "16px";
  msgBox.style.fontSize = "0.88rem";
  msgBox.style.fontWeight = "500";
  msgBox.style.lineHeight = "1.4";

  if (isError) {
    msgBox.style.backgroundColor = "rgba(229, 57, 53, 0.1)";
    msgBox.style.border = "1px solid #E53935";
    msgBox.style.color = "#C62828";
    msgBox.innerHTML = `⚠️ ${message}`;
  } else {
    msgBox.style.backgroundColor = "rgba(45, 106, 79, 0.1)";
    msgBox.style.border = "1px solid #2D6A4F";
    msgBox.style.color = "#1B4332";
    msgBox.innerHTML = `✅ ${message}`;
  }
}

function getPostLoginDestination() {
  const requestedPath = new URLSearchParams(window.location.search).get("returnTo");

  if (requestedPath) {
    const destination = new URL(requestedPath, window.location.href);
    const loginDirectory = new URL("./", window.location.href).pathname;
    const page = destination.pathname.split("/").pop().toLowerCase();
    if (
      destination.origin === window.location.origin &&
      destination.pathname.startsWith(loginDirectory) &&
      protectedFeaturePages.has(page)
    ) {
      return destination.href;
    }
  }

  return new URL("dashboard.html", window.location.href).href;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm && new URLSearchParams(window.location.search).get("reason") === "auth-required") {
    showAuthMessage(loginForm, "Please sign in to access this feature.", false);
  }

  // ==========================================
  // LOGIN HANDLER (MongoDB + Password Match)
  // ==========================================
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const identifierInput = document.getElementById("email") || loginForm.querySelector("input[type='email'], input[type='text']");
      const passwordInput = document.getElementById("password") || loginForm.querySelector("input[type='password']");
      const submitBtn = loginForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerText : "Login";

      const identifier = identifierInput ? identifierInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      // 1. Client-Side Regex Validation
      const isEmail = AUTH_CONFIG.REGEX.EMAIL.test(identifier);
      const isUsername = AUTH_CONFIG.REGEX.USERNAME.test(identifier);

      if (!identifier) {
        showAuthMessage(loginForm, "Please enter your username or email address.");
        if (identifierInput) identifierInput.focus();
        return;
      }

      if (!isEmail && !isUsername) {
        showAuthMessage(loginForm, "Invalid format. Username must be 3-20 characters (alphanumeric/underscore) or a valid email address.");
        if (identifierInput) identifierInput.focus();
        return;
      }

      if (!password || password.length < 6) {
        showAuthMessage(loginForm, "Password must be at least 6 characters long.");
        if (passwordInput) passwordInput.focus();
        return;
      }

      // 2. Submit to MongoDB Auth API
      try {
        if (submitBtn) {
          submitBtn.innerText = "Authenticating... 🌾";
          submitBtn.disabled = true;
        }

        const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showAuthMessage(loginForm, "Login successful! Redirecting...", false);

          // Save session to localStorage
          localStorage.setItem("krishimitra_token", data.token);
          localStorage.setItem("krishimitra_user_id", data.user.id);
          localStorage.setItem("krishimitra_user_email", data.user.email);
          localStorage.setItem("krishimitra_user_name", data.user.name);
          localStorage.setItem("krishimitra_username", data.user.username);

          setTimeout(() => {
            window.location.href = getPostLoginDestination();
          }, 800);
        } else {
          showAuthMessage(loginForm, data.message || "Authentication failed. Please verify your credentials.");
        }
      } catch (err) {
        console.error("Login Network Error:", err);
        showAuthMessage(loginForm, "Unable to reach the MongoDB authentication server. Please ensure the backend is running.");
      } finally {
        if (submitBtn) {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  // ==========================================
  // REGISTRATION HANDLER (MongoDB)
  // ==========================================
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById("username") || registerForm.querySelector("input[name='username']");
      const nameInput = document.getElementById("name") || registerForm.querySelector("input[type='text']:not(#username)");
      const phoneInput = document.getElementById("phone") || registerForm.querySelector("input[type='tel']");
      const emailInput = document.getElementById("email") || registerForm.querySelector("input[type='email']");
      const passwordInput = document.getElementById("password") || registerForm.querySelector("input[type='password']");
      const submitBtn = registerForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerText : "Create Account";

      const username = usernameInput ? usernameInput.value.trim() : (emailInput ? emailInput.value.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_") : "");
      const name = nameInput ? nameInput.value.trim() : "KrishiMitra Farmer";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      // 1. Client-Side Regex Validation
      if (!AUTH_CONFIG.REGEX.USERNAME.test(username)) {
        showAuthMessage(registerForm, "Username must be 3-20 characters long and contain only letters, numbers, or underscores (_).");
        if (usernameInput) usernameInput.focus();
        return;
      }

      if (!AUTH_CONFIG.REGEX.EMAIL.test(email)) {
        showAuthMessage(registerForm, "Please enter a valid email address (e.g. farmer@domain.com).");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!AUTH_CONFIG.REGEX.PASSWORD.test(password)) {
        showAuthMessage(registerForm, "Password must be at least 6 characters long and contain at least one letter and one number.");
        if (passwordInput) passwordInput.focus();
        return;
      }

      if (phone && !AUTH_CONFIG.REGEX.PHONE.test(phone)) {
        showAuthMessage(registerForm, "Please enter a valid 10-digit phone number.");
        if (phoneInput) phoneInput.focus();
        return;
      }

      // 2. Submit Registration to MongoDB API
      try {
        if (submitBtn) {
          submitBtn.innerText = "Creating Account... 🌾";
          submitBtn.disabled = true;
        }

        const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, name, phone, email, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showAuthMessage(registerForm, "Account registered successfully! Redirecting...", false);

          localStorage.setItem("krishimitra_token", data.token);
          localStorage.setItem("krishimitra_user_id", data.user.id);
          localStorage.setItem("krishimitra_user_email", data.user.email);
          localStorage.setItem("krishimitra_user_name", data.user.name);
          localStorage.setItem("krishimitra_username", data.user.username);

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1000);
        } else {
          showAuthMessage(registerForm, data.message || "Failed to register account.");
        }
      } catch (err) {
        console.error("Registration Network Error:", err);
        showAuthMessage(registerForm, "Unable to reach the MongoDB authentication server. Please ensure the backend is running.");
      } finally {
        if (submitBtn) {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});