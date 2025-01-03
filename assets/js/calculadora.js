const valorImpGanancia = 0.3,
  valorImpBienesPersonales = 0,
  billeteras = ["Ual\xe1", "MercadoPago", "Personal Pay", "N1U"];
function calcularTotal() {
  let a = $("#moneda").val() || "USD",
    e = parseFloat($('input[name="valor"]').val() || 0),
    t = parseFloat($('input[name="costo"]').val() || 0),
    l = parseFloat($('input[name="descuento"]').val() || 0);
  if ("ARS" == a) {
    let o = parseFloat($("#dolarAliExpress").val() || 0);
    (e /= o), t > 0 && (t /= o), l > 0 && (l /= o);
  }
  Number(l).toFixed(2), Number(t).toFixed(2), Number(e).toFixed(2);
  let i = $('select[name="anuales"]').val(),
    n = parseFloat($('input[name="tasa"]').val() || tasa),
    s = parseFloat($("#bancoSelect").val() || 0),
    r = parseFloat($("#dolarOficial").val() || 0),
    m = parseFloat($("#dolarNacion").val() || 0),
    c = $("#esHistorial").val(),
    v = $("#bancoSelect option:selected").text();
  e > 0 &&
    e + t >= l &&
    ((montoSinImpuestos = (e + t - l) * s),
    (montoNacion = billeteras.includes(v) ? (e + t - l) * m : 0),
    "D\xf3lar MEP Oficial" == v
      ? ((impGanancia = 0), (impBienesPersonales = 0))
      : ((impGanancia =
          montoNacion > 0 ? 0.3 * montoNacion : 0.3 * montoSinImpuestos),
        (impBienesPersonales =
          montoNacion > 0 ? 0 * montoNacion : 0 * montoSinImpuestos)),
    (total =
      montoSinImpuestos +
      impGanancia +
      impBienesPersonales +
      n +
      (excedente =
        "si" === i
          ? (e + t - l) * 0.5 * r
          : e + t > 50
          ? (e + t - l - 50) * 0.5 * r
          : 0)),
    $("#total").text(`AR${formatoMoneda.format(total)}`),
    $("#montoSinImpuestos").text(
      `AR${formatoMoneda.format(montoSinImpuestos)}`
    ),
    $("#impGanancia").text(`AR${formatoMoneda.format(impGanancia)}`),
    $("#impBienesPersonales").text(
      `AR${formatoMoneda.format(impBienesPersonales)}`
    ),
    $("#vep").text(`AR${formatoMoneda.format(n)}`),
    $("#excedente").text(`AR${formatoMoneda.format(excedente)}`),
    modificarTotal(),
    "false" === c && guardarEnHistorial());
}
