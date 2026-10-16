/* =========================================
   KRISHIMITRA AI — WEATHER MODULE
   Fetches live weather from backend and
   renders a premium weather card in
   #weatherSection
========================================= */

const recommendationData = window.recommendationData || {};

/* ---- Emoji icon map ---- */
const weatherIconMap = {
  Clear: { icon: "☀️", label: "Clear Sky", gradient: "linear-gradient(135deg,#f7971e,#ffd200)" },
  Clouds: { icon: "☁️", label: "Cloudy", gradient: "linear-gradient(135deg,#bdc3c7,#8e9eab)" },
  Rain: { icon: "🌧️", label: "Rainy", gradient: "linear-gradient(135deg,#4FC3F7,#1976D2)" },
  Drizzle: { icon: "🌦️", label: "Drizzle", gradient: "linear-gradient(135deg,#89f7fe,#66a6ff)" },
  Thunderstorm: { icon: "⛈️", label: "Thunderstorm", gradient: "linear-gradient(135deg,#373B44,#4286f4)" },
  Snow: { icon: "❄️", label: "Snowy", gradient: "linear-gradient(135deg,#E0EAFC,#CFDEF3)" },
  Mist: { icon: "🌫️", label: "Misty", gradient: "linear-gradient(135deg,#c9d6ff,#e2e2e2)" },
  Haze: { icon: "🌁", label: "Hazy", gradient: "linear-gradient(135deg,#c9d6ff,#e2e2e2)" },
  Smoke: { icon: "💨", label: "Smoky", gradient: "linear-gradient(135deg,#bdc3c7,#2c3e50)" },
  Fog: { icon: "🌫️", label: "Foggy", gradient: "linear-gradient(135deg,#c9d6ff,#e2e2e2)" },
};

/* ---- Skeleton while loading ---- */
function showWeatherSkeleton() {
  document.getElementById("weatherSection").innerHTML = `
    <div class="weather-card-wrapper">
      <div class="weather-skeleton">
        <div class="wsk-top">
          <div class="wsk-bar wsk-bar--wide skeleton"></div>
          <div class="wsk-bar wsk-bar--narrow skeleton"></div>
        </div>
        <div class="wsk-bar wsk-bar--temp skeleton"></div>
        <div class="wsk-stats">
          <div class="wsk-stat skeleton"></div>
          <div class="wsk-stat skeleton"></div>
          <div class="wsk-stat skeleton"></div>
          <div class="wsk-stat skeleton"></div>
        </div>
      </div>
    </div>
  `;
}

/* ---- Main fetch & render function ---- */
const fetchWeatherData = async (latitude, longitude) => {

  showWeatherSkeleton();

  try {
    const response = await fetch(
      `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (!data.success) throw new Error(data.message || "Weather fetch failed");

    /* Store in shared recommendation data object */
    if (window.recommendationData) {
      window.recommendationData.weather = data;
    }

    renderWeatherCard(data);

  } catch (error) {
    console.error("Weather ERROR:", error);
    document.getElementById("weatherSection").innerHTML = `
      <div class="weather-card-wrapper">
        <div class="weather-error-card glass-card">
          <span class="weather-error-icon">⚠️</span>
          <p class="weather-error-msg">Unable to fetch weather data. Please try again.</p>
          <p class="weather-error-sub">${error.message}</p>
        </div>
      </div>
    `;
  }
};

/* ---- Render the beautiful weather card ---- */
function renderWeatherCard(data) {
  const condition = data.weatherCondition || "Clear";
  const info = weatherIconMap[condition] || { icon: "🌤️", label: condition, gradient: "linear-gradient(135deg,#4CAF50,#2E7D32)" };

  const tempInt = Math.round(data.temperature);
  const feelsLike = data.feelsLike ? Math.round(data.feelsLike) : "—";
  const desc = data.description
    ? data.description.charAt(0).toUpperCase() + data.description.slice(1)
    : info.label;

  /* Suitability badge */
  const suitability = getSuitability(data);

  document.getElementById("weatherSection").innerHTML = `
    <div class="weather-card-wrapper">
      <div class="weather-main-card glass-card" id="weatherLiveCard">

        <!-- Top bar -->
        <div class="weather-topbar">
          <div class="weather-location-info">
            <span class="weather-pin">📍</span>
            <div>
              <h3 class="weather-city">${data.location || "Your Location"}</h3>
              <p class="weather-time">Live Weather · ${getCurrentTime()}</p>
            </div>
          </div>
          <span class="weather-suitability-badge ${suitability.cls}">${suitability.text}</span>
        </div>

        <!-- Main weather display -->
        <div class="weather-body">

          <div class="weather-temp-block">
            <div class="weather-icon-big animate-float">${info.icon}</div>
            <div>
              <div class="weather-temp-num">${tempInt}°<span class="temp-unit">C</span></div>
              <div class="weather-desc">${desc}</div>
            </div>
          </div>

          <!-- Stats grid -->
          <div class="weather-stats-grid">

            <div class="weather-stat-item">
              <span class="ws-icon">💧</span>
              <div>
                <span class="ws-value">${data.humidity}%</span>
                <span class="ws-label">Humidity</span>
              </div>
            </div>

            <div class="weather-stat-item">
              <span class="ws-icon">💨</span>
              <div>
                <span class="ws-value">${data.windSpeed} m/s</span>
                <span class="ws-label">Wind Speed</span>
              </div>
            </div>

            <div class="weather-stat-item">
              <span class="ws-icon">🌡️</span>
              <div>
                <span class="ws-value">${data.pressure} hPa</span>
                <span class="ws-label">Pressure</span>
              </div>
            </div>

            <div class="weather-stat-item">
              <span class="ws-icon">🌧️</span>
              <div>
                <span class="ws-value">${data.rainfall} mm</span>
                <span class="ws-label">Rainfall (1h)</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Farming advisory strip -->
        <div class="weather-advisory">
          <span class="advisory-icon"></span>
          <span class="advisory-text">${getFarmingAdvisory(data)}</span>
        </div>

      </div>
    </div>
  `;

  /* Apply condition-specific gradient to the card background accent */
  const card = document.getElementById("weatherLiveCard");
  if (card) {
    card.style.setProperty("--weather-gradient", info.gradient);
  }
}

/* ---- Helpers ---- */

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getSuitability(data) {
  const temp = data.temperature;
  const hum = data.humidity;

  if (temp >= 20 && temp <= 35 && hum >= 40 && hum <= 80) {
    return { cls: "suit-good", text: "✅ Good for Farming" };
  } else if (temp > 38 || hum > 90) {
    return { cls: "suit-warning", text: "⚠️ Stress Conditions" };
  } else if (temp < 10) {
    return { cls: "suit-bad", text: "❄️ Cold Stress Risk" };
  }
  return { cls: "suit-moderate", text: "🟡 Moderate Conditions" };
}

function getFarmingAdvisory(data) {
  const cond = data.weatherCondition;
  const temp = data.temperature;
  const hum = data.humidity;

  if (cond === "Rain" || cond === "Drizzle") {
    return "Rainfall detected — avoid pesticide spraying. Good conditions for transplanting seedlings.";
  }
  if (cond === "Thunderstorm") {
    return "Thunderstorm alert — keep workers off the field. Secure equipment and irrigation lines.";
  }
  if (temp > 38) {
    return "High heat stress — irrigate in the early morning or evening. Mulch to retain soil moisture.";
  }
  if (hum > 85) {
    return "High humidity — monitor for fungal diseases. Ensure good field drainage.";
  }
  if (cond === "Clear" && temp >= 22 && temp <= 34) {
    return "Ideal farming weather — great day for field operations, sowing, and irrigation management.";
  }
  return "";
}