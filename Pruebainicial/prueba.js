// Crear el mapa
var map = L.map('map').setView([0, 0], 2);

// Agregar una capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function fetchEarthquakeData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                if (event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var category = event.categories[0].title;

                    L.circle([coords[1], coords[0]], {
                        color: 'brown',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 100 // Radio fijo, ya que no hay magnitud
                    }).addTo(map)
                      .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}`);
                }
            });
        })
        .catch(error => console.error('Error fetching EONET data:', error));
}

// Llamar a la función para obtener datos sísmicos
fetchEarthquakeData();
// Función para obtener y mostrar los incendios forestales
function fetchWildfireData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;
                
                // Filtrar solo los eventos de tipo "Wildfires"
                if (category === 'Wildfires' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString(); // Convertir la fecha a formato legible

                    L.circle([coords[1], coords[0]], {
                        color: 'blue',
                        fillColor: '#f06',
                        fillOpacity: 0.7,
                        radius: 50000 // Radio fijo para incendios
                    }).addTo(map)
                      .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

// Llamar a la función para obtener los datos de incendios forestales
fetchWildfireData();

// Función para mostrar/ocultar la leyenda
document.getElementById('about-btn').addEventListener('click', function() {
    var legend = document.getElementById('legend');
    var aboutButton = document.getElementById('about-btn');
    
    // Obtener la posición del botón "Acerca de"
    var rect = aboutButton.getBoundingClientRect();
    
    // Ajustar la posición de la leyenda
    legend.style.top = rect.bottom + 'px';
    legend.style.left = rect.left + 'px';

    // Alternar visibilidad de la leyenda
    if (legend.style.display === 'none' || legend.style.display === '') {
        legend.style.display = 'block';
    } else {
        legend.style.display = 'none';
    }
});
