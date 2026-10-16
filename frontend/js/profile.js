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
  };

  let isEditing = false;

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

});