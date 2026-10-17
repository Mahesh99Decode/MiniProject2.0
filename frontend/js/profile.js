<<<<<<< HEAD
/* =========================================
   KRISHIMITRA AI — PROFILE
========================================= */

document.addEventListener("DOMContentLoaded", async () => {

  const editButton = document.getElementById("editProfileBtn");
  if (!editButton) return;

  const email = localStorage.getItem('krishimitra_user_email') || 'test@example.com';
  let currentPhotoURL = "assets/images/farmer-avatar.png";

  // Elements
  const els = {
    nameText: document.getElementById("profileNameText"),
    nameInput: document.getElementById("profileNameInput"),
    locText: document.getElementById("profileLocationText"),
    locInput: document.getElementById("profileLocationInput"),
    landText: document.getElementById("landText"),
    landInput: document.getElementById("landInput"),
    cropText: document.getElementById("cropText"),
    cropInput: document.getElementById("cropInput"),
    irrigationText: document.getElementById("irrigationText"),
    irrigationInput: document.getElementById("irrigationInput"),
    experienceText: document.getElementById("experienceText"),
    experienceInput: document.getElementById("experienceInput"),
    avatarImg: document.getElementById("profileAvatar"),
    avatarOverlay: document.getElementById("avatarOverlay"),
    avatarUpload: document.getElementById("avatarUpload")
=======
/* ========================================================
   KRISHIMITRA AI — FARMER PROFILE MANAGEMENT & SIGN OUT
   MongoDB Real-Time Sync & Authentication Handlers
======================================================== */

// Global Sign Out Handler
window.handleGlobalSignOut = function() {
  const modal = document.getElementById("signOutModal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    if (confirm("Are you sure you want to sign out of KrishiMitra AI?")) {
      executeSignOut();
    }
  }
};

window.closeSignOutModal = function() {
  const modal = document.getElementById("signOutModal");
  if (modal) {
    modal.style.display = "none";
  }
};

window.executeSignOut = function() {
  // Clear all local auth credentials & session tokens
  localStorage.removeItem("krishimitra_token");
  localStorage.removeItem("krishimitra_user_id");
  localStorage.removeItem("krishimitra_user_email");
  localStorage.removeItem("krishimitra_user_name");
  localStorage.removeItem("krishimitra_username");

  showProfileToast("🚪 Signed out successfully. Returning to Login...", false);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 700);
};

// Toast notification helper
function showProfileToast(message, isError = false) {
  const existing = document.getElementById("profileToastNotice");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "profileToastNotice";
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${isError ? "#991B1B" : "#1B4332"};
    color: #FFFFFF;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 10px 28px rgba(0,0,0,0.2);
    border: 1px solid ${isError ? "#FCA5A5" : "rgba(82, 183, 136, 0.4)"};
    z-index: 9999999;
    animation: fadeUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("krishimitra_token");
  const storedEmail = localStorage.getItem("krishimitra_user_email") || "rajesh@krishimitra.org";
  const storedUsername = localStorage.getItem("krishimitra_username") || "rajesh_patil";

  let currentUserData = {
    username: storedUsername,
    email: storedEmail,
    name: localStorage.getItem("krishimitra_user_name") || "Rajesh Patil",
    phone: "9876543210",
    location: "Nashik, Maharashtra",
    photoURL: "assets/images/farmer-avatar.png",
    farmDetails: {
      totalLand: "12.5 Acres",
      mainCrop: "Wheat (HD-2967)",
      irrigationType: "Drip Irrigation",
      experience: "14 Years"
    }
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a
  };

  let isEditing = false;

<<<<<<< HEAD
  // 1. Fetch Profile Data on Load
  try {
    const res = await fetch(`http://localhost:5000/api/users/profile/${email}`);
    if (res.ok) {
      const user = await res.json();
      els.nameText.textContent = user.name || "Anonymous Farmer";
      els.locText.textContent = user.location || "Unknown Location";
      els.landText.textContent = user.farmDetails?.totalLand || "0 Acres";
      els.cropText.textContent = user.farmDetails?.mainCrop || "None";
      els.irrigationText.textContent = user.farmDetails?.irrigationType || "None";
      els.experienceText.textContent = user.farmDetails?.experience || "0 Years";
      
      if (user.photoURL) {
        currentPhotoURL = user.photoURL;
        els.avatarImg.src = currentPhotoURL;
      }
    }
  } catch (error) {
    console.error("Failed to load profile:", error);
  }

  // 2. Handle Edit / Save
  editButton.addEventListener("click", async () => {
    if (!isEditing) {
      // Switch to Edit Mode
      isEditing = true;
      editButton.textContent = "Save Profile";
      editButton.style.backgroundColor = "#2e7d32"; // Darker green

      // Populate Inputs
      els.nameInput.value = els.nameText.textContent;
      els.locInput.value = els.locText.textContent;
      els.landInput.value = els.landText.textContent;
      els.cropInput.value = els.cropText.textContent;
      els.irrigationInput.value = els.irrigationText.textContent;
      els.experienceInput.value = els.experienceText.textContent;

      // Toggle Visibility
      els.nameText.style.display = "none"; els.nameInput.style.display = "block";
      els.locText.style.display = "none"; els.locInput.style.display = "block";
      els.landText.style.display = "none"; els.landInput.style.display = "block";
      els.cropText.style.display = "none"; els.cropInput.style.display = "block";
      els.irrigationText.style.display = "none"; els.irrigationInput.style.display = "block";
      els.experienceText.style.display = "none"; els.experienceInput.style.display = "block";
      els.avatarOverlay.style.display = "block";

    } else {
      // Save Mode
      editButton.textContent = "Saving...";
      editButton.disabled = true;

      const payload = {
        email: email,
        name: els.nameInput.value,
        location: els.locInput.value,
        photoURL: currentPhotoURL,
        farmDetails: {
          totalLand: els.landInput.value,
          mainCrop: els.cropInput.value,
          irrigationType: els.irrigationInput.value,
          experience: els.experienceInput.value
        }
      };

      try {
        const res = await fetch(`http://localhost:5000/api/users/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          // Update static text
          els.nameText.textContent = payload.name;
          els.locText.textContent = payload.location;
          els.landText.textContent = payload.farmDetails.totalLand;
          els.cropText.textContent = payload.farmDetails.mainCrop;
          els.irrigationText.textContent = payload.farmDetails.irrigationType;
          els.experienceText.textContent = payload.farmDetails.experience;
        } else {
          alert("Failed to save profile.");
        }
      } catch (error) {
        console.error("Save Error:", error);
      }

      // Revert to View Mode
      isEditing = false;
      editButton.textContent = "Edit Profile";
      editButton.disabled = false;
      editButton.style.backgroundColor = ""; // Reset color

      els.nameText.style.display = "block"; els.nameInput.style.display = "none";
      els.locText.style.display = "block"; els.locInput.style.display = "none";
      els.landText.style.display = "block"; els.landInput.style.display = "none";
      els.cropText.style.display = "block"; els.cropInput.style.display = "none";
      els.irrigationText.style.display = "block"; els.irrigationInput.style.display = "none";
      els.experienceText.style.display = "block"; els.experienceInput.style.display = "none";
      els.avatarOverlay.style.display = "none";
    }
  });

  // 3. Handle Avatar Upload (Convert to Base64)
  els.avatarOverlay.addEventListener("click", () => {
    els.avatarUpload.click();
  });

  els.avatarUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        currentPhotoURL = readerEvent.target.result; // Base64 string
        els.avatarImg.src = currentPhotoURL;
      };
      reader.readAsDataURL(file);
    }
  });
=======
  // DOM Elements
  const els = {
    nameDisplay: document.getElementById("farmerNameDisplay"),
    nameInput: document.getElementById("farmerNameInput"),
    usernameDisplay: document.getElementById("farmerUsernameDisplay"),
    emailDisplay: document.getElementById("farmerEmailDisplay"),
    phoneDisplay: document.getElementById("farmerPhoneDisplay"),
    phoneInput: document.getElementById("farmerPhoneInput"),
    locationDisplay: document.getElementById("farmerLocationDisplay"),
    locationInput: document.getElementById("farmerLocationInput"),
    landDisplay: document.getElementById("farmLandDisplay"),
    landInput: document.getElementById("farmLandInput"),
    cropDisplay: document.getElementById("farmCropDisplay"),
    cropInput: document.getElementById("farmCropInput"),
    irrigationDisplay: document.getElementById("farmIrrigationDisplay"),
    irrigationInput: document.getElementById("farmIrrigationInput"),
    experienceDisplay: document.getElementById("farmExperienceDisplay"),
    experienceInput: document.getElementById("farmExperienceInput"),
    avatarImg: document.getElementById("profileAvatarImg"),
    avatarUpload: document.getElementById("profileAvatarFileInput"),
    editBtn: document.getElementById("editProfileBtn"),
    kisanCardNumber: document.getElementById("kisanCardNumber"),
    kisanCardHolder: document.getElementById("kisanCardHolder"),
    kisanCardCrop: document.getElementById("kisanCardCrop"),
    kisanCardLand: document.getElementById("kisanCardLand"),
    regDateDisplay: document.getElementById("memberSinceDisplay"),
  };

  // 1. Fetch Profile from MongoDB
  async function loadProfile() {
    try {
      let fetchedUser = null;

      // Try authenticated endpoint first if token is present
      if (token) {
        try {
          const authRes = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (authRes.ok) {
            const json = await authRes.json();
            if (json.success && json.user) {
              fetchedUser = json.user;
            }
          }
        } catch (e) {
          console.warn("Auth /me fetch notice:", e.message);
        }
      }

      // Fallback to public identifier endpoint
      if (!fetchedUser) {
        const ident = storedUsername || storedEmail;
        const res = await fetch(`http://localhost:5000/api/users/profile/${ident}`);
        if (res.ok) {
          fetchedUser = await res.json();
        }
      }

      if (fetchedUser) {
        currentUserData = {
          ...currentUserData,
          ...fetchedUser,
          farmDetails: {
            ...currentUserData.farmDetails,
            ...(fetchedUser.farmDetails || {})
          }
        };
      }

      renderProfile(currentUserData);
    } catch (err) {
      console.error("Profile load error:", err);
      renderProfile(currentUserData);
    }
  }

  function renderProfile(user) {
    if (els.nameDisplay) els.nameDisplay.innerText = user.name || "Rajesh Patil";
    if (els.usernameDisplay) els.usernameDisplay.innerText = `@${user.username || "rajesh_patil"}`;
    const secUser = document.getElementById("secUsernameDisplay");
    if (secUser) secUser.innerText = user.username || "rajesh_patil";
    if (els.emailDisplay) els.emailDisplay.innerText = user.email || storedEmail;
    if (els.phoneDisplay) els.phoneDisplay.innerText = user.phone || "+91 98765 43210";
    if (els.locationDisplay) els.locationDisplay.innerText = user.location || "Nashik, Maharashtra";

    const farm = user.farmDetails || {};
    if (els.landDisplay) els.landDisplay.innerText = farm.totalLand || "12.5 Acres";
    if (els.cropDisplay) els.cropDisplay.innerText = farm.mainCrop || "Wheat (HD-2967)";
    if (els.irrigationDisplay) els.irrigationDisplay.innerText = farm.irrigationType || "Drip Irrigation";
    if (els.experienceDisplay) els.experienceDisplay.innerText = farm.experience || "14 Years";

    if (els.avatarImg && user.photoURL) {
      els.avatarImg.src = user.photoURL;
    }

    // Populate Kisan Smart Card
    if (els.kisanCardHolder) els.kisanCardHolder.innerText = (user.name || "RAJESH PATIL").toUpperCase();
    if (els.kisanCardCrop) els.kisanCardCrop.innerText = farm.mainCrop || "WHEAT (HD-2967)";
    if (els.kisanCardLand) els.kisanCardLand.innerText = farm.totalLand || "12.5 ACRES";
    if (els.kisanCardNumber) {
      const suffix = (user._id || user.id || "4409").toString().slice(-4).toUpperCase();
      els.kisanCardNumber.innerText = `KA-2026-MH-${suffix}`;
    }

    if (els.regDateDisplay && user.createdAt) {
      const date = new Date(user.createdAt);
      els.regDateDisplay.innerText = `Active since ${date.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`;
    }

    // Also update sidebar user info if sidebar is in DOM
    const sidebarName = document.getElementById("sidebarUserName");
    const sidebarEmail = document.getElementById("sidebarUserEmail");
    const sidebarAvatar = document.getElementById("sidebarAvatar");
    if (sidebarName) sidebarName.innerText = user.name || "Farmer";
    if (sidebarEmail) sidebarEmail.innerText = `@${user.username || "farmer"}`;
    if (sidebarAvatar && user.photoURL) sidebarAvatar.src = user.photoURL;
  }

  // 2. Edit Profile Mode Toggle
  if (els.editBtn) {
    els.editBtn.addEventListener("click", async () => {
      if (!isEditing) {
        // ENTER EDIT MODE
        isEditing = true;
        els.editBtn.innerHTML = "💾 Save Changes";
        els.editBtn.style.background = "linear-gradient(135deg, #16A34A, #15803D)";

        // Populate form inputs with current values
        if (els.nameInput) { els.nameInput.value = currentUserData.name || ""; els.nameInput.style.display = "block"; els.nameDisplay.style.display = "none"; }
        if (els.phoneInput) { els.phoneInput.value = currentUserData.phone || ""; els.phoneInput.style.display = "block"; els.phoneDisplay.style.display = "none"; }
        if (els.locationInput) { els.locationInput.value = currentUserData.location || ""; els.locationInput.style.display = "block"; els.locationDisplay.style.display = "none"; }
        if (els.landInput) { els.landInput.value = currentUserData.farmDetails?.totalLand || ""; els.landInput.style.display = "block"; els.landDisplay.style.display = "none"; }
        if (els.cropInput) { els.cropInput.value = currentUserData.farmDetails?.mainCrop || ""; els.cropInput.style.display = "block"; els.cropDisplay.style.display = "none"; }
        if (els.irrigationInput) { els.irrigationInput.value = currentUserData.farmDetails?.irrigationType || ""; els.irrigationInput.style.display = "block"; els.irrigationDisplay.style.display = "none"; }
        if (els.experienceInput) { els.experienceInput.value = currentUserData.farmDetails?.experience || ""; els.experienceInput.style.display = "block"; els.experienceDisplay.style.display = "none"; }

        showProfileToast("✏️ Edit mode active. Update your farm profile and click Save.");
      } else {
        // SAVE CHANGES TO MONGODB
        els.editBtn.innerHTML = "Saving... 🌿";
        els.editBtn.disabled = true;

        const updatedPayload = {
          name: els.nameInput ? els.nameInput.value.trim() : currentUserData.name,
          phone: els.phoneInput ? els.phoneInput.value.trim() : currentUserData.phone,
          location: els.locationInput ? els.locationInput.value.trim() : currentUserData.location,
          photoURL: currentUserData.photoURL,
          farmDetails: {
            totalLand: els.landInput ? els.landInput.value.trim() : currentUserData.farmDetails.totalLand,
            mainCrop: els.cropInput ? els.cropInput.value.trim() : currentUserData.farmDetails.mainCrop,
            irrigationType: els.irrigationInput ? els.irrigationInput.value.trim() : currentUserData.farmDetails.irrigationType,
            experience: els.experienceInput ? els.experienceInput.value.trim() : currentUserData.farmDetails.experience,
          }
        };

        try {
          let saveSuccess = false;

          // Attempt authenticated PUT first
          if (token) {
            const authPutRes = await fetch("http://localhost:5000/api/auth/profile", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(updatedPayload)
            });
            if (authPutRes.ok) saveSuccess = true;
          }

          // Fallback to user update endpoint
          if (!saveSuccess) {
            const putRes = await fetch("http://localhost:5000/api/users/profile", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: currentUserData.email,
                username: currentUserData.username,
                ...updatedPayload
              })
            });
            if (putRes.ok) saveSuccess = true;
          }

          // Update local memory and UI
          currentUserData = {
            ...currentUserData,
            ...updatedPayload,
            farmDetails: {
              ...currentUserData.farmDetails,
              ...updatedPayload.farmDetails
            }
          };

          localStorage.setItem("krishimitra_user_name", currentUserData.name);
          renderProfile(currentUserData);
          showProfileToast("✅ Profile saved to MongoDB successfully!");
        } catch (saveErr) {
          console.error("Save error:", saveErr);
          showProfileToast("⚠️ Failed to reach server. Changes kept locally.", true);
        } finally {
          // Revert back to display mode
          isEditing = false;
          els.editBtn.innerHTML = "✏️ Edit Profile";
          els.editBtn.style.background = "";
          els.editBtn.disabled = false;

          if (els.nameInput) { els.nameInput.style.display = "none"; els.nameDisplay.style.display = "block"; }
          if (els.phoneInput) { els.phoneInput.style.display = "none"; els.phoneDisplay.style.display = "block"; }
          if (els.locationInput) { els.locationInput.style.display = "none"; els.locationDisplay.style.display = "block"; }
          if (els.landInput) { els.landInput.style.display = "none"; els.landDisplay.style.display = "block"; }
          if (els.cropInput) { els.cropInput.style.display = "none"; els.cropDisplay.style.display = "block"; }
          if (els.irrigationInput) { els.irrigationInput.style.display = "none"; els.irrigationDisplay.style.display = "block"; }
          if (els.experienceInput) { els.experienceInput.style.display = "none"; els.experienceDisplay.style.display = "block"; }
        }
      }
    });
  }

  // 3. Avatar Upload & Preview
  if (els.avatarUpload) {
    els.avatarUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (re) => {
          const base64Photo = re.target.result;
          currentUserData.photoURL = base64Photo;
          if (els.avatarImg) els.avatarImg.src = base64Photo;

          // Save to backend
          try {
            if (token) {
              await fetch("http://localhost:5000/api/auth/profile", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ photoURL: base64Photo })
              });
            } else {
              await fetch("http://localhost:5000/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: currentUserData.email, photoURL: base64Photo })
              });
            }
            showProfileToast("📸 Profile photo updated!");
          } catch (err) {
            console.warn("Avatar sync error:", err);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Initialize
  await loadProfile();
>>>>>>> 72b9483fdf8d1ae0024355b9dfc0284a68dc287a

});