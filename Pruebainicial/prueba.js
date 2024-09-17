// script.js

// Crear el mapa
var map = L.map('map').setView([0, 0], 2);

// Agregar una capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para obtener y mostrar los datos sísmicos
function fetchEarthquakeData() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                var coords = feature.geometry.coordinates;
                var magnitude = feature.properties.mag;
                var location = feature.properties.place;

                L.circle([coords[1], coords[0]], {
                    color: 'brown',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: magnitude * 10000
                }).addTo(map)
                  .bindPopup(`<b>Magnitud:</b> ${magnitude}<br><b>Ubicación:</b> ${location}`);
            });
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

// Llamar a la función para obtener datos sísmicos
fetchEarthquakeData();
