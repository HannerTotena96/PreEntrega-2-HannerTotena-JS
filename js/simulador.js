const servicios = [
    { nombre: "Análisis Químico", precio: 50000 },
    { nombre: "Ensayo Metalúrgico", precio: 120000 },
    { nombre: "Consultoría Minera", precio: 200000 }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formSimulador");
    const resultado = document.getElementById("resultado");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const servicioIndex = parseInt(document.getElementById("servicio").value);
      const cantidad = parseInt(document.getElementById("cantidad").value);
      const urgente = document.getElementById("urgente").checked;
  
      if (isNaN(servicioIndex) || isNaN(cantidad) || cantidad <= 0) {
        resultado.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos correctamente.</div>`;
        return;
      }
  
      const servicio = servicios[servicioIndex];
      let costo = servicio.precio * cantidad;
      if (urgente) {
        costo *= 1.2;
      }
  
      const cotizacion = {
        servicio: servicio.nombre,
        cantidad,
        urgente,
        costoTotal: costo
      };
  
      guardarCotizacion(cotizacion);
  
      resultado.innerHTML = `
        <div class="card shadow p-4 mb-4 bg-white rounded">
          <h4 class="mb-3">Resultado de la Cotización</h4>
          <p><strong>Servicio:</strong> ${cotizacion.servicio}</p>
          <p><strong>Cantidad:</strong> ${cotizacion.cantidad}</p>
          <p><strong>Urgente:</strong> ${cotizacion.urgente ? "Sí" : "No"}</p>
          <p><strong>Total:</strong> <span class="text-success fw-bold">$${cotizacion.costoTotal.toLocaleString()} COP</span></p>
        </div>
      `;
    });
  
    function guardarCotizacion(cotizacion) {
      let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
      cotizaciones.push(cotizacion);
      localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
    }
  });