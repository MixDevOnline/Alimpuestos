// Función para realizar la solicitud JSONP a la API
function fetchDolarValuesJSONP(callback) {
    // Generar un nombre de función única
    const callbackName = 'jsonpCallback_' + Math.round(100000 * Math.random());

    // Crear un script con la URL que incluye el nombre de la función de retorno
    const script = document.createElement('script');
    script.src = `https://alimpuestos-api.onrender.com/valores?callback=${callbackName}`;
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
    // Obtener el elemento select
    const bancoSelect = document.getElementById('bancoSelect');

    // Verificar si hay datos disponibles y el elemento select existe
    if (data && Array.isArray(data) && bancoSelect) {
        // Limpiar el contenido actual del select
        bancoSelect.innerHTML = '';

        // Iterar sobre los datos y agregar opciones al select
        data.forEach(value => {
            if(value.name == "Banco Central") {
                document.getElementById('dolarOficial').value = value.value;
            } else if (value.name == "Banco Nación (Día Anterior)") {
                document.getElementById('dolarNacion').value = value.value;
                return;
            } else if (value.name == "AliExpress") {
                document.getElementById('dolarAliExpress').value = value.value;
                return;
            }
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