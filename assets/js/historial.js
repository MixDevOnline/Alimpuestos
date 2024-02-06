function guardarEnHistorial() {
    // Obtener el historial actual desde el localStorage
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
  
    // Obtenemos los valores actuales
    const valorProducto = parseFloat($('input[name="valor"]').val() || 0);
    const costoEnvio = parseFloat($('input[name="costo"]').val() || 0);
    const moneda = $("#moneda").val();
    const anuales = $('select[name="anuales"]').val();
    const tasa = parseFloat($('input[name="tasa"]').val());
    const valorDolar = parseFloat($("#bancoSelect").val() || 0);
    const descuento = parseFloat($('input[name="descuento"]').val() || 0);
    const total = $("#total").text();
    const banco = $("#bancoSelect option:selected").text();
    const vep = parseFloat(
      $("#vep")
        .text()
        .replace(/[^\d,]/g, "")
        .replace(/(\d{3}),/g, "$1.")
    );
    const excedente = parseFloat(
      $("#excedente")
        .text()
        .replace(/[^\d,]/g, "")
        .replace(/(\d{3}),/g, "$1.")
    );
    const valoresSeleccionados = $("#valores").val();
    const valores = [];
  
    // Realizar los cálculos adicionales según los valores seleccionados
  
    // Iterar sobre todas las opciones posibles y restar los valores correspondientes
    [
      "montoSinImpuestos",
      "impPais",
      "impGanancia",
      "impBienesPersonales",
      "vep",
      "excedente",
    ].forEach((valor) => {
      if (!valoresSeleccionados.includes(valor)) {
        switch (valor) {
          case "montoSinImpuestos":
            valores.push("Sin Monto sin Impuestos");
            break;
          case "impPais":
            valores.push("Sin Imp. Pais");
            break;
          case "impGanancia":
            valores.push("Sin Imp. Ganancias");
            break;
          case "impBienesPersonales":
            valores.push("Sin Imp. Bienes Personales");
            break;
          case "vep":
            valores.push("Sin VEP");
            break;
          case "excedente":
            valores.push("Sin Excedente");
            break;
          default:
            break;
        }
      }
    });
  
    // Crear un objeto con los valores actuales
    const calculoActual = {
      valorProducto,
      costoEnvio,
      moneda,
      anuales,
      tasa,
      valorDolar,
      descuento,
      total,
      banco,
      vep,
      valoresSeleccionados,
      excedente,
      valores: valores.join(", "),
      fecha: new Date().toLocaleString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
    };
  
    // Agregar el objeto al historial
    historial.push(calculoActual);
  
    // Guardar el historial actualizado en el localStorage
    localStorage.setItem("historial", JSON.stringify(historial));
  }
  
  function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const historialDiv = document.getElementById("historial");
  
    // Limpiar el contenido anterior
    historialDiv.innerHTML = "";
  
    // Mostrar un mensaje si no hay registros en el historial
    if (historial.length === 0) {
      historialDiv.innerHTML = "<p>No hay registros en el historial</p>";
      return;
    }
  
    // Ordenar el historial por fecha de manera descendente (de reciente a más antiguo)
    historial.sort((a, b) => {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();
      return dateB - dateA;
    });
  
    // Mostrar cada entrada del historial como una tarjeta
    for (let index = historial.length - 1; index >= 0; index--) {
      const entrada = historial[index];
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
              <div class="card-header" style="background-color: #fd9900;">
                  <p class="card-header-title" style="color: white;">Cálculo realizado el ${
                    entrada.fecha
                  }</p>
              </div>
              <div class="card-content">
                  <div class="content">
                      <p><strong>Valor del Producto:</strong> ${entrada.moneda}${
                        formatoMoneda.format(entrada.valorProducto)
                      }</p>
                      <p><strong>Banco Usado:</strong> ${
                        entrada.banco
                      } (Valor del Dólar: AR${formatoMoneda.format(entrada.valorDolar)})</p>
                      <p><strong>Descuento: </strong> ${entrada.moneda}${formatoMoneda.format(entrada.descuento)}</p>
                      <p><strong>Costo de Envío: </strong> ${entrada.moneda}${
                        formatoMoneda.format(entrada.costoEnvio)
                      }</p>
                      <p><strong>Realizó más de 12 compras este año?: </strong> ${
                        entrada.anuales.charAt(0).toUpperCase() +
                        entrada.anuales.slice(1)
                      }</p>
                      <p><strong>Tasa del Correo: </strong> AR$ ${
                        entrada.tasa
                      }</p>
                      <p><strong>Detalle: </strong> ${
                          entrada.valores
                      }</p>
                  </div>
              </div>
              <footer class="card-footer">
                  <p class="card-footer-item"><strong>Total: ${entrada.total}</strong></p>
                  <a href="#" class="card-footer-item" onclick="usarHistorial(${index})"><i class="fa-solid fa-file-import"></i>&nbsp;Importar este valor</i></a>
              </footer>
          `;
  
      if (index !== historial.length) {
        card.classList.add("mb-4");
      }
  
      historialDiv.appendChild(card);
    };
  }
  
  function borrarHistorial() {
    localStorage.removeItem("historial");
    cargarHistorial();
  }
  
  function usarHistorial(index) {
    const historial = JSON.parse(localStorage.getItem("historial"))[index];
  
    $('input[name="valor"]').val(historial.valorProducto);
    $('input[name="costo"]').val(historial.costoEnvio);
    $('select[name="anuales"]').val(historial.anuales);
    $('input[name="tasa"]').val(historial.tasa);
    $("#moneda option:contains("+ historial.moneda +")").prop("selected", true).trigger('change');
    $("#bancoSelect option:contains(" + historial.banco + ")").prop(
      "selected",
      true
    ).trigger('change');
    $('input[name="descuento"]').val(historial.descuento);
    $("#valores").val(historial.valoresSeleccionados).trigger('change');
    $("#esHistorial").val("true");
  
    calcularTotal();
  
    $("#history").removeClass("is-active");
    $("html").removeClass("is-clipped");
  }