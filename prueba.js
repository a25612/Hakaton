// Crear el mapa
var map = L.map('map').setView([0, 0], 2);

// Definir capas del mapa 2D
var osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy;',
    maxZoom: 19
});

var osmTopography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy;',
    maxZoom: 17
});

var osmCartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy;',
    maxZoom: 19
});

// Función para limpiar el mapa
function clearMap() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
            return;
        }
        map.removeLayer(layer);
    });
}

// Token de Cesium
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZmVjNjQyZS0wOTZkLTQyMDctODcxZS0xMWJiZDdkNzE4YmEiLCJpZCI6MjQzNzk0LCJpYXQiOjE3MjcxOTg5OTh9.DRq4Ldf2HUb5bTDqxoDRbwWZnoaGTVS5-p449_ugAQc';

// Crear el visor de CesiumJS en 3D
var viewer = new Cesium.Viewer('globe', {
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
    }),
    baseLayerPicker: true,
    geocoder: true,
    sceneModePicker: true,
    timeline: true,
    animation: true,
    fullscreenButton: true,
    navigationHelpButton: true,
});

// Centrar el visor en una ubicación específica
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, 20000000.0)
});

// Agregar la capa estándar por defecto
osmStandard.addTo(map);

// Crear un objeto para las capas
var baseMaps = {
    "OpenStreetMap Standard": osmStandard,
    "Topographic Map": osmTopography,
    "CartoDB Positron": osmCartoDB
};
L.control.layers(baseMaps).addTo(map);

function fetchVolcanoData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Volcanoes' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

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

function fetchWildfireData() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Wildfires' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    var customIcon = L.icon({
                        iconUrl: 'icons/wildfire.png',
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

// Función para mostrar/ocultar la leyenda
document.getElementById('about-btn').addEventListener('click', function () {
    var legend = document.getElementById('legend');
    legend.style.top = '50px';
    legend.style.left = '20px';
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

function displayFilteredEvents(events) {
    clearMap();
    events.forEach(event => {
        var coords = event.geometry[0].coordinates;
        var title = event.title;
        var category = event.categories[0].title;
        var date = new Date(event.geometry[0].date).toLocaleString();

        // Definir los iconos de los eventos
        var iconUrl = '';
        if (category === 'Volcanoes') iconUrl = 'icons/volcano.png';
        if (category === 'Wildfires') iconUrl = 'icons/wildfire.png';
        if (category === 'Sea and Lake Ice') iconUrl = 'icons/ice.png';
        if (category === 'Severe Storms') iconUrl = 'icons/storm.png';

        var customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [22, 22]
        });

        L.marker([coords[1], coords[0]], { icon: customIcon })
            .addTo(map)
            .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);
    });
}

function filterEventsByDateAndCategory(events, startDate, endDate, selectedCategories) {
    return events.filter(event => {
        var eventDate = new Date(event.geometry[0].date);
        var category = event.categories[0].title;

        // Verificar si el evento está dentro de las fechas y categoría seleccionada
        return eventDate >= startDate && eventDate <= endDate && selectedCategories.includes(category);
    });
}

// Función para obtener las categorías seleccionadas por los checkboxes
function getSelectedCategories() {
    var categories = [];
    if (document.getElementById('volcanoes').checked) categories.push('Volcanoes');
    if (document.getElementById('wildfires').checked) categories.push('Wildfires');
    if (document.getElementById('storms').checked) categories.push('Severe Storms');
    if (document.getElementById('icebergs').checked) categories.push('Sea and Lake Ice');
    if (document.getElementById('all-events').checked) categories = ['Volcanoes', 'Wildfires', 'Severe Storms', 'Sea and Lake Ice']; // Selección de "Todos los eventos"
    return categories;
}

// Desactivar los checkboxes individuales si se selecciona "Todos los eventos"
document.getElementById('all-events').addEventListener('change', function () {
    var individualCheckboxes = document.querySelectorAll('#event-filters input[type="checkbox"]:not(#all-events)');
    if (this.checked) {
        individualCheckboxes.forEach(cb => cb.checked = false);
    }
});

document.querySelectorAll('#event-filters input[type="checkbox"]:not(#all-events)').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (document.querySelectorAll('#event-filters input[type="checkbox"]:not(#all-events):checked').length > 0) {
            document.getElementById('all-events').checked = false; // Desmarcar "Todos los eventos"
        }
    });
});

document.getElementById('filter-btn').addEventListener('click', function () {
    var startDateInput = document.getElementById('start-date').value;
    var endDateInput = document.getElementById('end-date').value;
    var selectedCategories = getSelectedCategories();

    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            let filteredEvents;
            if (startDateInput && endDateInput) {
                var startDate = new Date(startDateInput);
                var endDate = new Date(endDateInput);

                filteredEvents = filterEventsByDateAndCategory(data.events, startDate, endDate, selectedCategories);
            } else {
                filteredEvents = data.events.filter(event => selectedCategories.includes(event.categories[0].title));
            }

            displayFilteredEvents(filteredEvents);
        })
        .catch(error => console.error('Error fetching EONET data:', error));
});

function showEventsByCategory(category) {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {

            data.events.forEach(event => {
                if (event.categories[0].title === category && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    var iconUrl = '';
                    if (category === 'Volcanoes') iconUrl = 'icons/volcano.png';
                    if (category === 'Wildfires') iconUrl = 'icons/wildfire.png';
                    if (category === 'Sea and Lake Ice') iconUrl = 'icons/ice.png';
                    if (category === 'Severe Storms') iconUrl = 'icons/storm.png';

                    var customIcon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [22, 22]
                    });

                    L.marker([coords[1], coords[0]], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(`<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`);
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

// Funcion de boton para alternar entre 2D y 3D
document.getElementById('toggle-view-btn').addEventListener('click', function () {
    var mapContainer = document.querySelector('.map-container');
    var globeContainer = document.getElementById('globe-container');

    if (mapContainer.style.display === 'none') {
        mapContainer.style.display = 'block';
        globeContainer.style.display = 'none';
        this.textContent = 'Cambiar a Mapa 3D';
    } else {
        mapContainer.style.display = 'none';
        globeContainer.style.display = 'block';
        this.textContent = 'Cambiar a Mapa 2D';
    }
});


// Añadir eventos al mapa 3D
function addVolcanoesToGlobe() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                // Filtrar eventos de volcanes
                if (category === 'Volcanoes' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    viewer.entities.add({
                        name: title,
                        position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1]),
                        billboard: {
                            image: 'icons/volcano.png',
                            width: 40,
                            height: 40
                        },
                        description: `<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`
                    });
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

addVolcanoesToGlobe();

function addIcebergsToGlobe() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Sea and Lake Ice' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    viewer.entities.add({
                        name: title,
                        position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1]),
                        billboard: {
                            image: 'icons/ice.png',
                            width: 40,
                            height: 40
                        },
                        description: `<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`
                    });
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

addIcebergsToGlobe();

function addStormsToGlobe() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Severe Storms' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    viewer.entities.add({
                        name: title,
                        position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1]),
                        billboard: {
                            image: 'icons/storm.png',
                            width: 40,
                            height: 40
                        },
                        description: `<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`
                    });
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

addStormsToGlobe();

function addWildfiresToGlobe() {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events')
        .then(response => response.json())
        .then(data => {
            data.events.forEach(event => {
                var category = event.categories[0].title;

                if (category === 'Wildfires' && event.geometry && event.geometry[0].type === 'Point') {
                    var coords = event.geometry[0].coordinates;
                    var title = event.title;
                    var date = new Date(event.geometry[0].date).toLocaleString();

                    viewer.entities.add({
                        name: title,
                        position: Cesium.Cartesian3.fromDegrees(coords[0], coords[1]),
                        billboard: {
                            image: 'icons/wildfire.png',
                            width: 40,
                            height: 40
                        },
                        description: `<b>Evento:</b> ${title}<br><b>Categoría:</b> ${category}<br><b>Fecha:</b> ${date}`
                    });
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de EONET:', error));
}

addWildfiresToGlobe();
