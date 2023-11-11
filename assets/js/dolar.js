// Función para realizar la solicitud JSONP a la API
function fetchDolarValuesJSONP(callback) {
    // Generar un nombre de función única
    const callbackName = 'jsonpCallback_' + Math.round(100000 * Math.random());

    // Crear un script con la URL que incluye el nombre de la función de retorno
    const script = document.createElement('script');
    script.src = `https://horizontalinsidiousrepo.mixdevcode.repl.co/valores?callback=${callbackName}`;
    document.body.appendChild(script);

    // Definir la función de retorno que manejará los datos
    window[callbackName] = function(data) {
        // Llamar a la función de retorno proporcionada por el usuario
        callback(data);

        // Limpiar el script y la función global después de obtener los datos
        document.body.removeChild(script);
        delete window[callbackName];
    };
}

// Función para obtener y llenar el select desde la respuesta JSONP
function buildDolarSelect(data) {
    // Almacenar los valores en el Local Storage
    localStorage.setItem('dolarValues', JSON.stringify(data));

    const fechaActual = new Date();
    const formattedFecha = fechaActual.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' });

    // Almacenar la fecha en el Local Storage
    localStorage.setItem('ultFecha', formattedFecha);

    // Obtener el elemento select
    const bancoSelect = document.getElementById('bancoSelect');

    // Verificar si hay datos disponibles y el elemento select existe
    if (data && Array.isArray(data) && bancoSelect) {
        // Limpiar el contenido actual del select
        bancoSelect.innerHTML = '';

        // Iterar sobre los datos y agregar opciones al select
        data.forEach(value => {
            const option = document.createElement('option');
            option.value = value.value;
            option.text = value.name;
            bancoSelect.appendChild(option);
        });

        // Remover el loader y mostrar el select
        document.getElementById('loader').classList.remove('is-active');
        document.getElementById('calculadora').style = "display: block;";
        
        // Llamar a la función de cambiar el dólar del span
        changeDolar();
    }
}

// Verificar si ya pasó la hora para actualizar el valor del dólar
function shouldUpdateDolarValue() {
    const horaActual = new Date();
    const horaLimite = new Date(horaActual);
    horaLimite.setHours(15, 0, 0, 0); // Establecer la hora límite a las 15:00

    return (horaActual >= horaLimite) || !localStorage.getItem('dolarValues');
}

// Función principal para actualizar el valor del dólar si es necesario
function updateDolarValueIfNeeded() {
    if (shouldUpdateDolarValue()) {
        fetchDolarValuesJSONP(buildDolarSelect);
    } else {
        // Llamar a la función para construir el select directamente
        buildDolarSelect(JSON.parse(localStorage.getItem('dolarValues')));
    }
}