// Función para realizar la solicitud GET a la API
function fetchDolarValues() {
    fetch('https://horizontalinsidiousrepo.mixdevcode.repl.co/valores', { mode: 'no-cors' })
        .then(response => response.json())
        .then(data => {
            // Almacenar los valores en el Local Storage
            localStorage.setItem('dolarValues', JSON.stringify(data));

            // Llamar a la función para construir el select
            buildDolarSelect();
        })
        .catch(error => console.error('Error al obtener los valores del dólar: ', error));
}

// Función para obtener y llenar el select desde el Local Storage
function buildDolarSelect() {
    // Obtener los valores del dólar del Local Storage
    const dolarValues = JSON.parse(localStorage.getItem('dolarValues'));
    const bancoSelect = document.getElementById('bancoSelect');

    // Verificar si hay datos disponibles y el elemento select existe
    if (dolarValues && Array.isArray(dolarValues) && bancoSelect) {
        // Limpiar el contenido actual del select
        bancoSelect.innerHTML = '';

        // Iterar sobre los datos y agregar opciones al select
        dolarValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value.value;
            option.text = value.name;
            bancoSelect.appendChild(option);
        });
    }
}

// Verificar si ya pasó la hora para actualizar el valor del dólar
function shouldUpdateDolarValue() {
    const horaActual = new Date();
    const horaLimite = new Date(horaActual);
    horaLimite.setHours(15, 0, 0, 0); // Establecer la hora límite a las 15:00

    return true;
}

// Función principal para actualizar el valor del dólar si es necesario
function updateDolarValueIfNeeded() {
    if (shouldUpdateDolarValue()) {
        fetchDolarValues();
    } else {
        // Llamar a la función para construir el select directamente
        buildDolarSelect();
    }
}