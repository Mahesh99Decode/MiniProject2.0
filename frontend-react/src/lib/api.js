// Base URL — Vite proxies /api → http://localhost:5000
const BASE = '/api'

export const api = {
  // ── Auth ──────────────────────────────────────────
  createUser: (token) =>
    fetch(`${BASE}/test/create-user`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  // ── User Profile ──────────────────────────────────
  getProfile: (email) =>
    fetch(`${BASE}/users/profile/${email}`).then(r => r.json()),

  updateProfile: (email, data) =>
    fetch(`${BASE}/users/profile/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // ── Weather ───────────────────────────────────────
  getWeather: (lat, lon) =>
    fetch(`${BASE}/weather?lat=${lat}&lon=${lon}`).then(r => r.json()),

  // ── Soil ──────────────────────────────────────────
  getSoil: (lat, lon, district = 'Nashik') =>
    fetch(`${BASE}/soil?lat=${lat}&lon=${lon}&district=${district}`).then(r => r.json()),

  // ── Crop Advisory ─────────────────────────────────
  getCropRecommendation: (params) =>
    fetch(`${BASE}/recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(r => r.json()),

  // ── Disease Detection ─────────────────────────────
  analyzeImage: (base64Url, mimeType) =>
    fetch(`${BASE}/vision/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Url, mimeType }),
    }).then(r => r.json()),

  // ── Chatbot ───────────────────────────────────────
  chat: (message, context = {}) =>
    fetch(`${BASE}/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    }).then(r => r.json()),

  // ── Simulation / Yield Prediction ─────────────────
  predictYield: (params) =>
    fetch(`${BASE}/simulation/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(r => r.json()),

  // ── Schemes ───────────────────────────────────────
  getSchemes: () =>
    fetch(`${BASE}/schemes`).then(r => r.json()),

  // ── Alerts ────────────────────────────────────────
  getAlerts: () =>
    fetch(`${BASE}/alerts`).then(r => r.json()),
}
