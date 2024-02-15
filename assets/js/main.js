// Service Worker Dummy
navigator.serviceWorker.register('sw.js', { scope: '/' });

// Valor de la tasa (pendiente a obtener automático)
const tasa = 4300;

$('#tasa').val(tasa);
$('#tasaSpan').text(tasa);

// Variables para almacenar los valores
let total = 0,
    montoSinImpuestos = 0,
    impPais = 0,
    impGanancia = 0,
    impBienesPersonales = 0,
    excedente = 0,
    montoNacion = 0;

// Formatear la moneda
const formatoMoneda = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

// Select2
$("#bancoSelect").select2({
    "language": {
        "noResults": function(){
            return "No se encontraron resultados...";
        }
    },
});
$("#valores").select2();
$('#valores').on('select2:opening select2:closing', function (event) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
});

function changeDolar() {
    const select = $('#bancoSelect');
    const fecha = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    $('#dolar').text(select.val());
    $('#fecha').text(fecha);
}

// Llamar a la función principal
fetchDolarValuesJSONP(buildDolarSelect);
// Funcion de cambio de valor del dolar
changeDolar();

$("input").on("input", function () {
    $("#esHistorial").val("false");
})

$("#bancoSelect").on("change", function () {
    $("#esHistorial").val("false");
})

// Cambiar moneda
$("#moneda").on("change", function () {
    $("#esHistorial").val("false");
    $(".button.is-static").each(function (index) {
        if(index < 2) {
            if($(this).html().replace(/\s/g,'') == "ARS") {
                $(this).html("USD")
            } else {
                $(this).html("ARS")
            }
        }
    })
})