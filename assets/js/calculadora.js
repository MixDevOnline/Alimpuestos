function calcularTotal() {
    // Obtener los valores de entrada
    const valorProducto = parseFloat(
      document.querySelector('input[name="valor"]').value
    );
    const costoEnvio = parseFloat(
      document.querySelector('input[name="costo"]').value
    );
    const anuales = document.querySelector('select[name="anuales"]').value;
    const tasa = parseFloat(document.querySelector('input[name="tasa"]').value);
    const valorDolar = parseFloat(document.getElementById("bancoSelect").value || 0);
  
    // Realizar cálculos
    let total = 0;
    let montoSinImpuestos = 0;
    let impPais = 0;
    let impGanancia = 0;
    let impBienesPersonales = 0;
    let excedente = 0;
  
    if (valorProducto > 0) {
      montoSinImpuestos = (valorProducto + costoEnvio) * valorDolar;
  
      if (anuales === "si") {
        impPais = montoSinImpuestos * 0.3;
        impGanancia = montoSinImpuestos * 0.45;
        impBienesPersonales = montoSinImpuestos * 0.25;
        excedente = ((valorProducto + costoEnvio) * 0.5) * valorDolar; // El excedente es el 50% del valor total
      } else {
        if (valorProducto + costoEnvio > 50) {
          impPais = montoSinImpuestos * 0.3;
          impGanancia = montoSinImpuestos * 0.45;
          impBienesPersonales = montoSinImpuestos * 0.25;
          excedente = (((valorProducto + costoEnvio) - 50) * 0.5) * valorDolar; // El excedente es el 50% del exceso sobre 50
        } else {
          impPais = montoSinImpuestos * 0.3;
          impGanancia = montoSinImpuestos * 0.45;
          impBienesPersonales = montoSinImpuestos * 0.25;
        }
      }
  
      total =
        montoSinImpuestos +
        impPais +
        impGanancia +
        impBienesPersonales +
        tasa +
        excedente;
    }
  
    // Formatear los valores en el formato "AR$ 99.999,99"
    const formatoMoneda = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  
    document.getElementById("total").textContent = `AR${formatoMoneda.format(
      total
    )}`;
    document.getElementById(
      "montoSinImpuestos"
    ).textContent = `AR${formatoMoneda.format(montoSinImpuestos)}`;
    document.getElementById("impPais").textContent = `AR${formatoMoneda.format(
      impPais
    )}`;
    document.getElementById(
      "impGanancia"
    ).textContent = `AR${formatoMoneda.format(impGanancia)}`;
    document.getElementById(
      "impBienesPersonales"
    ).textContent = `AR${formatoMoneda.format(impBienesPersonales)}`;
    document.getElementById("excedente").textContent = `AR${formatoMoneda.format(
      excedente
    )}`;
  }