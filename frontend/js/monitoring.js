/* =========================================
   KRISHIMITRA AI — MONITORING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const uploadArea = document.getElementById("uploadArea");

  const fileInput = document.getElementById("cropUpload");

  const previewContainer =
    document.getElementById("imagePreview");

  const previewImage =
    document.getElementById("previewImage");

  if (!uploadArea || !fileInput) return;

  /* CLICK UPLOAD */

  uploadArea.addEventListener("click", () => {

    fileInput.click();
  });

  /* IMAGE PREVIEW */

  fileInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function(e) {
      const base64Url = e.target.result;
      previewImage.src = base64Url;
      previewContainer.classList.remove("hidden");
      
      // Get mimeType
      const mimeType = file.type;

      await analyzeImage(base64Url, mimeType);
    };

    reader.readAsDataURL(file);
  });

  async function analyzeImage(base64Url, mimeType) {
    const uploadBtn = document.querySelector(".upload-content .btn-primary");
    const originalBtnText = uploadBtn.innerText;
    
    // Show scanning state on button
    uploadBtn.innerText = "Scanning Image... 🌿";
    uploadBtn.disabled = true;

    try {
      const response = await fetch("http://localhost:5000/api/vision/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Url, mimeType })
      });

      const data = await response.json();

      if (data.success && data.data) {
        updateUI(data.data);
      } else {
        alert("Error analyzing image: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Vision Analysis Error:", error);
      alert("Could not connect to the AI Vision service.");
    } finally {
      // Restore button
      uploadBtn.innerText = originalBtnText;
      uploadBtn.disabled = false;
    }
  }

  function updateUI(data) {
    // 1. Update Health Score
    document.querySelector(".health-circle h1").innerText = `${data.healthScore}%`;
    document.querySelector(".health-score-card p").innerText = data.healthSummary;

    // 2. Update Detections List
    const detectionList = document.querySelector(".detection-list");
    detectionList.innerHTML = "";

    if (data.detections && data.detections.length > 0) {
      data.detections.forEach(det => {
        const detHtml = `
          <div class="detection-card ${det.severity}">
            <div class="detection-icon">${det.icon}</div>
            <div>
              <h4>${det.name}</h4>
              <p>${det.description}</p>
            </div>
          </div>
        `;
        detectionList.innerHTML += detHtml;
      });
    } else {
      detectionList.innerHTML = "<p>No specific diseases detected.</p>";
    }

    // 3. Update Actionable Suggestions
    const suggestionsList = document.getElementById("actionableSuggestionsList");
    if (data.actionableSuggestions && suggestionsList) {
      suggestionsList.innerHTML = `
        <div class="detection-card success-detection">
          <div class="detection-icon">💧</div>
          <div>
            <h4>Water Needs</h4>
            <p>${data.actionableSuggestions.water || "Maintain standard watering."}</p>
          </div>
        </div>
        <div class="detection-card info-detection">
          <div class="detection-icon">🌱</div>
          <div>
            <h4>Fertilizer</h4>
            <p>${data.actionableSuggestions.fertilizer || "No specific fertilizer needed."}</p>
          </div>
        </div>
        <div class="detection-card warning-detection">
          <div class="detection-icon">⚡</div>
          <div>
            <h4>Immediate Action</h4>
            <p>${data.actionableSuggestions.immediateAction || "Monitor crop continuously."}</p>
          </div>
        </div>
      `;
    }

    // 4. Prepend to Monitoring History
    const historyList = document.getElementById("monitoringHistoryList");
    if (historyList) {
      let statusClass = "success-status";
      let statusText = "Healthy";
      if (data.healthScore < 80) { statusClass = "warning-status"; statusText = "Warning"; }
      if (data.healthScore < 50) { statusClass = "danger-status"; statusText = "Critical"; }

      const newHistory = `
        <div class="history-item" style="animation: fadeUp 0.5s ease forwards;">
          <div>
            <h4>${data.cropName || "Unknown Crop"} Scan</h4>
            <p>Just now</p>
          </div>
          <span class="history-status ${statusClass}">${statusText}</span>
        </div>
      `;
      historyList.insertAdjacentHTML("afterbegin", newHistory);
    }

    // 5. Append to Timeline
    const timeline = document.getElementById("weeklyTimeline");
    if (timeline) {
      // Demote previous active items to normal
      const activeItems = timeline.querySelectorAll(".timeline-item.active");
      activeItems.forEach(item => item.classList.remove("active"));

      const newTimelineItem = `
        <div class="timeline-item active" style="animation: fadeUp 0.5s ease forwards;">
          <div class="timeline-dot"></div>
          <div>
            <h4>${data.cropStage || "Current Stage"}</h4>
            <p>${data.healthSummary}</p>
          </div>
        </div>
      `;
      timeline.insertAdjacentHTML("beforeend", newTimelineItem);
    }
  }

});