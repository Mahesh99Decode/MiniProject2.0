/* =========================================
   KRISHIMITRA AI — SIMULATION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const simulationBtn =
    document.querySelector(".full-width-btn");

  if (!simulationBtn) return;

  simulationBtn.addEventListener("click", () => {

    /* BUTTON LOADING */

    simulationBtn.innerText =
      "Running AI Simulation...";

    simulationBtn.disabled = true;

    /* REAL AI PROCESSING */
    const selects = document.querySelectorAll(".form-input");
    const cropType = selects[0].value;
    const soilQuality = selects[1].value;
    const rainfallPred = selects[2].value;

    let rainfall = 100;
    if (rainfallPred.includes("High")) rainfall = 200;
    else if (rainfallPred.includes("Low")) rainfall = 50;
    let temperature = 25; // Default

    // Simple label mapping for simulation
    const cropMap = { "Soybean": 0, "Wheat": 1, "Sugarcane": 2 };
    let Item = cropMap[cropType] || 0;

    fetch("http://localhost:5002/predict-yield", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ rainfall, temperature, Item })
    })
    .then(res => res.json())
    .then(data => {
        simulationBtn.innerText = "Simulation Completed ✅";
        simulationBtn.style.background = "#2E7D32";
        simulationBtn.disabled = false;

        const yieldValue = document.querySelector(".analytics-card h2");
        if (yieldValue && data.predicted_yield) {
            let yieldVal = parseFloat(data.predicted_yield);
            yieldValue.innerText = !isNaN(yieldVal) ? yieldVal.toFixed(2) + " t/h" : data.predicted_yield;
        }
    })
    .catch(err => {
        console.error(err);
        simulationBtn.innerText = "Simulation Failed";
        simulationBtn.style.background = "";
        simulationBtn.disabled = false;
        alert("Make sure the ML backend is running on port 5002.");
    });
  });
});