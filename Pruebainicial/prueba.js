// Crear el mapa
var map = L.map('map').setView([20, 0], 2);

// Agregar una capa de tile del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Agregar un marcador de ejemplo
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Un marcador en Londres.')
    .openPopup();


    document.addEventListener('DOMContentLoaded', function() {
        // Cargar el JSON desde un archivo local
        fetch('magnitude.json')
            .then(response => response.json())
            .then(data => {
                // Mostrar los datos en la consola para verificar que se cargaron correctamente
                console.log(data);
    
                // Aquí puedes añadir el código para procesar y mostrar los datos en la página
                const magnitudesContainer = document.createElement('div');
                magnitudesContainer.innerHTML = `
                    <h1>${data.title}</h1>
                    <p>${data.description}</p>
                    <ul>
                        ${data.magnitudes.map(magnitude => `
                            <li>
                                <h2>${magnitude.name} (${magnitude.unit})</h2>
                                <p>${magnitude.description}</p>
                                <a href="${magnitude.link}" target="_blank">Más información</a>
                            </li>
                        `).join('')}
                    </ul>
                `;
                document.body.appendChild(magnitudesContainer);
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    });