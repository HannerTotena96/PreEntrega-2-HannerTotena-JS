document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("phone").value.trim();
    const comentarios = document.getElementById("comments").value.trim();

    if (!nombre || !email || !telefono || !comentarios) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de enviar.",
      });
      return;
    }

    const contacto = {
      nombre,
      email,
      telefono,
      comentarios,
      fecha: new Date().toLocaleString()
    };

    enviarMensaje(contacto)
      .then(() => {
        guardarEnLocalStorage(contacto);
        mostrarToast(`Gracias por tu mensaje, ${nombre} 🙌`);
        form.reset();
      })
      .catch(() => {
        Swal.fire("Ups", "Hubo un problema al enviar el mensaje", "error");
      });
  });

  function enviarMensaje(contacto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mensaje simulado enviado:", contacto);
        resolve();
      }, 1000); // simula una espera
    });
  }

  function guardarEnLocalStorage(contacto) {
    let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    mensajes.push(contacto);
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));
  }

  function mostrarToast(mensaje) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 2500
    });
  }
});
