function modificarTotalModal() {
    // Abrir el modal
    $("#selector").addClass("is-active");

    // Agregar la clase is-clipped al elemento <html>
    $("html").addClass("is-clipped");
}

function cerrarModal() {
    // Cerrar el modal
    $("#selector").removeClass("is-active");

    // Eliminar la clase is-clipped del elemento <html>
    $("html").removeClass("is-clipped");
}

function modificarTotal() {
    // Obtener los valores seleccionados del <select>
    const valoresSeleccionados = $("#valores").val();

    // Realizar los cálculos adicionales según los valores seleccionados
    let totalModal = total;

    // Iterar sobre todas las opciones posibles y restar los valores correspondientes
    ["montoSinImpuestos", "impPais", "impGanancia", "impBienesPersonales", "vep", "excedente"].forEach((valor) => {
        if (!valoresSeleccionados.includes(valor)) {
            switch (valor) {
                case "montoSinImpuestos":
                    totalModal -= montoSinImpuestos;
                    break;
                case "impPais":
                    totalModal -= impPais;
                    break;
                case "impGanancia":
                    totalModal -= impGanancia;
                    break;
                case "impBienesPersonales":
                    totalModal -= impBienesPersonales;
                    break;
                case "vep":
                    totalModal -= tasa;
                    break;
                case "excedente":
                    totalModal -= excedente;
                    break;
                default:
                    break;
            }
        }
    });

    // Actualizar la interfaz con los nuevos valores
    // (puedes usar la misma lógica que en la función calcularTotal)
    $("#total").text(`AR${formatoMoneda.format(Math.max(totalModal, 0))}`);

    // Cerrar el modal
    $("#selector").removeClass("is-active");

    // Eliminar la clase is-clipped del elemento <html>
    $("html").removeClass("is-clipped");
}

function restablecerModal() {
    $("#valores option").prop("selected", true);
    $("#valores").trigger("change");
    modificarTotal();
}

function verHistorial() {

    // Cargar el historial
    cargarHistorial();

    // Abrir el modal
    $("#history").addClass("is-active");

    // Agregar la clase is-clipped al elemento <html>
    $("html").addClass("is-clipped");
    
}

function cerrarHistorial() {
    // Cerrar el modal
    $("#history").removeClass("is-active");

    // Eliminar la clase is-clipped del elemento <html>
    $("html").removeClass("is-clipped");
}