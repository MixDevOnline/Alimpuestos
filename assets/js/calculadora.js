// Constantes necesarias
const valorImpPais = 0.3;
const valorImpGanancia = 0.3;
const valorImpBienesPersonales = 0;
const billeteras = ["Ualá", "MercadoPago"];

function calcularTotal() {
  // Obtener los valores de entrada con jQuery
  const moneda = $("#moneda").val() || "USD";
  let valorProducto = parseFloat($('input[name="valor"]').val() || 0);
  let costoEnvio = parseFloat($('input[name="costo"]').val() || 0);
  let descuento = parseFloat($('input[name="descuento"]').val() || 0);
  if(moneda == "ARS") {
    let dolarAliExpress = parseFloat($("#dolarAliExpress").val() || 0);
    valorProducto = valorProducto / dolarAliExpress;
    if(costoEnvio > 0) {
      costoEnvio = costoEnvio / dolarAliExpress;
    }
    if(descuento > 0) {
      descuento = descuento / dolarAliExpress;
    }
  }
  // No sé por qué esto está así pero así funciona ;)
  Number(descuento).toFixed(2);
  Number(costoEnvio).toFixed(2);
  Number(valorProducto).toFixed(2);

  const anuales = $('select[name="anuales"]').val();
  const tasaInput = parseFloat($('input[name="tasa"]').val() || tasa);
  const valorDolar = parseFloat($("#bancoSelect").val() || 0);
  const dolarOficial = parseFloat($("#dolarOficial").val() || 0);
  const dolarNacion = parseFloat($("#dolarNacion").val() || 0);
  const esHistorial = $("#esHistorial").val();
  const bancoSelect = $("#bancoSelect option:selected").text();

  if (valorProducto > 0 && valorProducto + costoEnvio >= descuento) {
    montoSinImpuestos = (valorProducto + costoEnvio - descuento) * valorDolar;
    montoNacion = billeteras.includes(bancoSelect) ? (valorProducto + costoEnvio - descuento) * dolarNacion : 0;

    impPais = montoNacion > 0 ? montoNacion * valorImpPais : montoSinImpuestos * valorImpPais;
    impGanancia = montoNacion > 0 ? montoNacion * valorImpGanancia : montoSinImpuestos * valorImpGanancia;
    impBienesPersonales = montoNacion > 0 ? montoNacion * valorImpBienesPersonales : montoSinImpuestos * valorImpBienesPersonales;

    if (anuales === "si")
      excedente = (valorProducto + costoEnvio - descuento) * 0.5 * dolarOficial;
    else if (valorProducto + costoEnvio > 50)
      excedente =
        (valorProducto + costoEnvio - descuento - 50) * 0.5 * dolarOficial;
    else excedente = 0;

    total =
      montoSinImpuestos +
      impPais +
      impGanancia +
      impBienesPersonales +
      tasaInput +
      excedente;
  } else {
    return;
  }

  $("#total").text(`AR${formatoMoneda.format(total)}`);
  $("#montoSinImpuestos").text(`AR${formatoMoneda.format(montoSinImpuestos)}`);
  $("#impPais").text(`AR${formatoMoneda.format(impPais)}`);
  $("#impGanancia").text(`AR${formatoMoneda.format(impGanancia)}`);
  $("#impBienesPersonales").text(
    `AR${formatoMoneda.format(impBienesPersonales)}`
  );
  $("#vep").text(`AR${formatoMoneda.format(tasaInput)}`);
  $("#excedente").text(`AR${formatoMoneda.format(excedente)}`);

  // Aplicar los filtros de valores
  modificarTotal();

  if (esHistorial === "false") {
    // Guardar en el historial
    guardarEnHistorial();
  }
}