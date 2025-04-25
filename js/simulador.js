let servicios = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSimulador");
  const resultado = document.getElementById("resultado");
  const selectServicio = document.getElementById("servicio");

  
  fetch("js/servicios.json")
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar los servicios.");
      return res.json();
    })
    .then((data) => {
      servicios = data;
      selectServicio.innerHTML = '<option value="">Seleccione un servicio</option>';
      servicios.forEach((s, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = s.nombre;
        selectServicio.appendChild(option);
      });
    })
    .catch((err) => {
      Swal.fire("Error", err.message, "error");
    });

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const servicioIndex = parseInt(selectServicio.value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const urgente = document.getElementById("urgente").checked;

    if (isNaN(servicioIndex) || isNaN(cantidad) || cantidad <= 0) {
      Swal.fire("Error", "Por favor completa todos los campos correctamente.", "error");
      return;
    }

    const servicio = servicios[servicioIndex];

    simularCotizacion(servicio, cantidad, urgente)
      .then((cotizacion) => {
        guardarCotizacion(cotizacion);
        mostrarResultado(cotizacion);
        mostrarToast("Cotización generada correctamente");
        mostrarHistorial();
      })
      .catch((err) => {
        Swal.fire("Ups!", err, "error");
      });
  });

  
  function simularCotizacion(servicio, cantidad, urgente) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let costo = servicio.precio * cantidad;
        if (urgente) costo *= 1.2;

        resolve({
          servicio: servicio.nombre,
          cantidad,
          urgente,
          costoTotal: costo
        });
      }, 1000);
    });
  }

  function guardarCotizacion(cotizacion) {
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizaciones.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
  }

  function mostrarResultado(c) {
    resultado.innerHTML = `
      <div class="card shadow p-4 mb-4 bg-white rounded">
        <h4 class="mb-3">Resultado de la Cotización</h4>
        <p><strong>Servicio:</strong> ${c.servicio}</p>
        <p><strong>Cantidad:</strong> ${c.cantidad}</p>
        <p><strong>Urgente:</strong> ${c.urgente ? "Sí" : "No"}</p>
        <p><strong>Total:</strong> <span class="text-success fw-bold">$${c.costoTotal.toLocaleString()} COP</span></p>
      </div>
    `;
  }

  function mostrarToast(mensaje) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
  }

  function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    const historialDiv = document.createElement("div");
    historialDiv.innerHTML = `<h5 class="mt-4">Historial de Cotizaciones:</h5>`;
    historial.forEach((c, i) => {
      const item = document.createElement("p");
      item.innerHTML = `${i + 1}. ${c.servicio} x${c.cantidad} - ${c.urgente ? "Urgente" : "Normal"}: $${c.costoTotal.toLocaleString()} COP`;
      historialDiv.appendChild(item);
    });
    resultado.appendChild(historialDiv);
  }

  mostrarHistorial();
});
