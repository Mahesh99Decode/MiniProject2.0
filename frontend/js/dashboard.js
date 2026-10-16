/* =========================================
   KRISHIMITRA AI — DASHBOARD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  loadWeather();

  loadRecommendations();

  loadSoilAnalysis();

  loadAlerts();

});

/* =========================================
   WEATHER API
========================================= */

async function loadWeather() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/weather"
    );

    const data = await response.json();

    document.getElementById("weatherTemp")
    .innerText = `${data.temperature}°C`;

    document.getElementById("weatherCondition")
    .innerText = data.condition;

    document.getElementById("weatherHumidity")
    .innerText = `${data.humidity}%`;

    document.getElementById("weatherWind")
    .innerText = `${data.windSpeed} km/h`;

    document.getElementById("weatherRain")
    .innerText = `${data.rainProbability}%`;

  }

  catch(error) {

    console.log("Weather API Error:", error);

  }

}

/* =========================================
   RECOMMENDATION API
========================================= */

async function loadRecommendations() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/recommendations"
    );

    const crops = await response.json();

    const recommendationList =
      document.getElementById("recommendationList");

    recommendationList.innerHTML = "";

    crops.forEach((crop) => {

      recommendationList.innerHTML += `

        <div class="recommendation-item">

          <div>

            <h4>${crop.name}</h4>

            <p>
              Profitability:
              ${crop.profitability}
            </p>

          </div>

          <span class="recommendation-score">

            ${crop.score}%

          </span>

        </div>

      `;

    });

  }

  catch(error) {

    console.log(
      "Recommendation API Error:",
      error
    );

  }

}

/* =========================================
   SOIL ANALYSIS API
========================================= */

async function loadSoilAnalysis() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/soil-analysis"
    );

    const soil = await response.json();

    document.getElementById("soilHealthScore")
    .innerText = `${soil.health}%`;

    document.getElementById("soilPH")
    .innerText = soil.ph;

    document.getElementById("soilMoisture")
    .innerText = `${soil.moisture}%`;

    document.getElementById("soilNitrogen")
    .innerText = soil.nitrogen;

  }

  catch(error) {

    console.log(
      "Soil Analysis API Error:",
      error
    );

  }

}

/* =========================================
   ALERTS API
========================================= */

async function loadAlerts() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/alerts"
    );

    const alerts = await response.json();

    const alertsList =
      document.getElementById("alertsList");

    alertsList.innerHTML = "";

    alerts.forEach((alert) => {

      alertsList.innerHTML += `

        <div class="alert-item ${alert.type}">

          <span>${alert.icon}</span>

          <div>

            <h4>${alert.title}</h4>

            <p>${alert.message}</p>

          </div>

        </div>

      `;

    });

  }

  catch(error) {

    console.log("Alerts API Error:", error);

  }

}