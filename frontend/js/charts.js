/* =========================================
   KRISHIMITRA AI — CHARTS
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("marketChart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 300;

  const values = [40, 90, 70, 120, 110, 160];

  ctx.beginPath();
  ctx.moveTo(0, 250);

  values.forEach((value, index) => {

    ctx.lineTo(index * 100, 300 - value);
  });

  ctx.strokeStyle = "#2E7D32";
  ctx.lineWidth = 4;
  ctx.stroke();
});