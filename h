let allAlerts = [];

// Load alerts from JSON
fetch("alerts.json")
  .then(res => res.json())
  .then(alerts => {
    allAlerts = alerts; // save original list
    renderAlerts(allAlerts);
    renderMap(allAlerts);
  })
  .catch(err => console.error("Error loading alerts:", err));

// Render alert cards
function renderAlerts(alerts) {
  const container = document.getElementById("alertContainer");
  container.innerHTML = "";
  if (alerts.length === 0) {
    container.innerHTML = "<p>No alerts found for this location.</p>";
    return;
  }
  alerts.forEach(a => {
    const div = document.createElement("div");
    div.className = "alert card";
    div.innerHTML = `
      <h3>${a.location}</h3>
      <p>Risk Level: <strong>${a.risk}</strong> (${a.prob}%)</p>
    `;
    container.appendChild(div);
  });
}

// Render map with markers
function renderMap(alerts) {
  const map = L.map("map").setView([9.6, 6.56], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  alerts.forEach(a => {
    L.marker([a.lat, a.lng])
      .addTo(map)
      .bindPopup(`<b>${a.location}</b><br>Risk: ${a.risk} (${a.prob}%)`);
  });
}

// Search filter
document.getElementById("searchInput").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const filtered = allAlerts.filter(a => a.location.toLowerCase().includes(query));
  renderAlerts(filtered);
});
