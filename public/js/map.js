(() => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  if (typeof L === "undefined") {
    console.error("Leaflet is not loaded.");
    return;
  }

  if (
    typeof listingData === "undefined" ||
    !listingData.geometry ||
    !Array.isArray(listingData.geometry.coordinates) ||
    listingData.geometry.coordinates.length < 2
  ) {
    console.error("Listing coordinates are missing.");
    return;
  }

  const [rawLng, rawLat] = listingData.geometry.coordinates;
  const lng = Number(rawLng);
  const lat = Number(rawLat);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    console.error("Listing coordinates are invalid.");
    return;
  }

  const map = L.map(mapContainer).setView([lat, lng], 9);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${listingData.title}</b><br>${listingData.location}`)
    .openPopup();
})();
