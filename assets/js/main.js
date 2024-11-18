navigator.serviceWorker.register("sw.js", { scope: "/" });
const tasa = 7600;
$("#tasa").val(7600), $("#tasaSpan").text(7600);
let total = 0,
  montoSinImpuestos = 0,
  impPais = 0,
  impGanancia = 0,
  impBienesPersonales = 0,
  excedente = 0,
  montoNacion = 0;
const formatoMoneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});
function changeDolar() {
  let e = $("#bancoSelect"),
    t = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  $("#dolar").text(e.val()), $("#fecha").text(t);
}
$("#bancoSelect").select2({
  language: {
    noResults: function () {
      return "No se encontraron resultados...";
    },
  },
}),
  $("#valores").select2(),
  $("#valores").on("select2:opening select2:closing", function (e) {
    $(this).parent().find(".select2-search__field").prop("disabled", !0);
  }),
  fetchDolarValuesJSONP(buildDolarSelect, buildDolarSelect),
  changeDolar(),
  $("input").on("input", function () {
    $("#esHistorial").val("false");
  }),
  $("#bancoSelect").on("change", function () {
    $("#esHistorial").val("false");
  }),
  $("#moneda").on("change", function () {
    $("#esHistorial").val("false"),
      $(".button.is-static").each(function (e) {
        e != 1 &&
          ("ARS" == $(this).html().replace(/\s/g, "")
            ? $(this).html("USD")
            : $(this).html("ARS"));
      });
  });
