function changeDolar() {
    const select = document.getElementById('bancoSelect');
    const fecha = localStorage.getItem('ultFecha');

    document.getElementById('dolar').textContent = select.value;
    document.getElementById('fecha').textContent = fecha;
}

// Valor de la tasa (pendiente a obtener automático)
const tasa = 2300;

document.getElementById('tasa').value = tasa;
document.getElementById('tasaSpan').textContent = tasa;

// Llamar a la función principal
updateDolarValueIfNeeded();
// Llamar a la función para calcular el valor inicial
calcularTotal();
// Funcion de cambio de valor del dolar
changeDolar();