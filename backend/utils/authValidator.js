/**
 * Authentication Input Validation Utility
 * Uses strict regular expressions to validate username, email, and password
 */

// REGEX DEFINITIONS
const REGEX_PATTERNS = {
  // Username: 3 to 20 characters, alphanumeric and underscore only, no spaces
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,

  // Email: Standard RFC-compliant email address format
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Password: Minimum 6 characters, must include at least one letter and at least one number
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d).{6,50}$/,

  // Phone (optional): 10 digits or standard phone with country code
  PHONE: /^([0-9]{10}|[+]?[0-9\s-]{7,15})$/
};

/**
 * Validates registration input fields
 */
function validateRegistrationInput({ username, email, password, phone }) {
  const errors = [];

  // Username validation
  if (!username || typeof username !== "string") {
    errors.push("Username is required.");
  } else if (!REGEX_PATTERNS.USERNAME.test(username.trim())) {
    errors.push("Username must be 3-20 characters long and can contain only letters, numbers, and underscores (_).");
  }

  // Email validation
  if (!email || typeof email !== "string") {
    errors.push("Email address is required.");
  } else if (!REGEX_PATTERNS.EMAIL.test(email.trim())) {
    errors.push("Please provide a valid email address (e.g. farmer@krishimitra.org).");
  }

  // Password validation
  if (!password || typeof password !== "string") {
    errors.push("Password is required.");
  } else if (!REGEX_PATTERNS.PASSWORD.test(password)) {
    errors.push("Password must be at least 6 characters long and contain at least one letter and one number.");
  }

  // Phone validation (optional)
  if (phone && phone.trim() !== "" && !REGEX_PATTERNS.PHONE.test(phone.trim())) {
    errors.push("Please provide a valid phone number (10 digits).");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates login input fields
 */
function validateLoginInput({ identifier, password }) {
  const errors = [];

  if (!identifier || typeof identifier !== "string" || identifier.trim() === "") {
    errors.push("Username or Email is required.");
  } else {
    const trimmed = identifier.trim();
    // Identifier can be either valid username or valid email
    const isEmail = REGEX_PATTERNS.EMAIL.test(trimmed);
    const isUsername = REGEX_PATTERNS.USERNAME.test(trimmed);

    if (!isEmail && !isUsername) {
      errors.push("Enter a valid username (3-20 characters alphanumeric) or valid email address.");
    }
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  REGEX_PATTERNS,
  validateRegistrationInput,
  validateLoginInput,
};
