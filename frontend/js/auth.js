/* =========================================
   KRISHIMITRA AI — AUTH LOGIC
========================================= */

function togglePassword(toggleElement) {

  const input = toggleElement.parentElement.querySelector("input");

  if (input.type === "password") {

    input.type = "text";
    toggleElement.innerHTML = "🙈";

  } else {

    input.type = "password";
    toggleElement.innerHTML = "👁️";
  }
}

/* =========================================
   SIMPLE FORM VALIDATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll(".auth-form");

  forms.forEach(form => {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const inputs = form.querySelectorAll(".form-input");

      let isValid = true;

      inputs.forEach(input => {

        if (input.value.trim() === "") {

          input.style.borderColor = "#E53935";
          isValid = false;

        } else {

          input.style.borderColor = "#DADCE0";
        }
      });

      if (isValid) {
        
        // Find the email input and save to localStorage
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          localStorage.setItem('krishimitra_user_email', emailInput.value.trim());
        }

        alert("Authentication Successful!");
        window.location.href = "dashboard.html";
      }
    });
  });
});