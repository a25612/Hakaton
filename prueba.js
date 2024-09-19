// Crear el mapa
var map = L.map('map').setView([0, 0], 2);

// Agregar una capa de mapa base.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function fetchVolcanoData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                // Filtrar solo los eventos de tipo "Volcano"
                if (category === 'Volcanoes' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString(); // Convertir la fecha a formato legible

                    var customIcon = L.icon({
                        iconUrl: 'icons/volcano.png',
                        iconSize: [22, 22],  
                                            });

                    L.marker([coords[1], coords[0]], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);

                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

// Llamar a la función para obtener los datos de volcanes
fetchVolcanoData();


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

                    // Define el ícono personalizado
                    var customIcon = L.icon({
                        iconUrl: 'icons/wildfire.png', // Cambia esto por la ruta de tu icono descargado
                        iconSize: [22, 22],  // Ajusta el tamaño del ícono
                                            });

                    // Crear un marcador con el ícono personalizado y añadirlo al mapa
                    L.marker([coords[1], coords[0]], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

// Llamar a la función para obtener los datos de incendios forestales
fetchWildfireData();

function fetchIcebergData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Sea and Lake Ice' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString(); 

                    var customIcon = L.icon({
                        iconUrl: 'icons/ice.png',
                        iconSize: [22, 22],  
                                            });

                    L.marker([coords[1], coords[0]], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);

                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

fetchIcebergData();


function fetchStormData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Severe Storms' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString(); 

                    var customIcon = L.icon({
                        iconUrl: 'icons/storm.png',
                        iconSize: [22, 22],  
                                            });

                    L.marker([coords[1], coords[0]], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);

                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

fetchStormData();

// Función para mostrar/ocultar la leyenda
document.getElementById('about-btn').addEventListener('click', function () {
    var legend = document.getElementById('legend');

    // Ajustar la posición de la leyenda a la izquierda
    legend.style.top = '50px';  // Ajustamos el top si lo necesitas
    legend.style.left = '20px'; // Ponemos la leyenda a la izquierda del mapa

    // Alternar visibilidad de la leyenda
    if (legend.style.display === 'none' || legend.style.display === '') {
        legend.style.display = 'block';
    } else {
        legend.style.display = 'none';
    }
});

// Función para filtrar eventos por rango de fechas
function filterEventsByDate(events, startDate, endDate) {
    return events.filter(event => {
        if (event.geometry && event.geometry[0].date) {
            var eventDate = new Date(event.geometry[0].date);
            return eventDate >= startDate && eventDate <= endDate;
        }
        return false;
    });
}

// Función para mostrar los eventos filtrados en el mapa
function displayFilteredEvents(events) {
    map.eachLayer(layer => {
        if (layer instanceof L.Circle) {
            map.removeLayer(layer);  // Elimina los círculos anteriores
        }
    });

    events.forEach(event => {
        var coords = event.geometry[0].coordinates;
        var title = event.title;
        var category = event.categories[0].title;
        var date = new Date(event.geometry[0].date).toLocaleString();

        var color = category === 'Wildfires' ? 'blue' : 'brown'; // Incendios y terremotos

        L.circle([coords[1], coords[0]], {
            color: color,
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map)
            .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);
    });
}

// Añadir evento al botón de filtro
document.getElementById('filter-btn').addEventListener('click', function () {
    var startDateInput = document.getElementById('start-date').value;
    var endDateInput = document.getElementById('end-date').value;

    if (startDateInput && endDateInput) {
        var startDate = new Date(startDateInput);
        var endDate = new Date(endDateInput);

        fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
            .then(response => response.json())
            .then(data => {
                var filteredEvents = filterEventsByDate(data.events, startDate, endDate);
                displayFilteredEvents(filteredEvents);
            })
            .catch(error => console.error('Error fetching EONET data:', error));
    } else {
        alert('Por favor, selecciona un rango de fechas válido.');
    }
});
