document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const mensajeDiv = document.getElementById("mensajeConfirmacion");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("phone").value.trim();
      const comentarios = document.getElementById("comments").value.trim();
  
      if (!nombre || !email || !telefono || !comentarios) {
        mensajeDiv.innerHTML = `<div class="alert alert-danger">Por favor completa todos los campos.</div>`;
        return;
      }
  
      const contacto = { nombre, email, telefono, comentarios, fecha: new Date().toLocaleString() };
      
      let contactos = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
      contactos.push(contacto);
      localStorage.setItem("mensajesContacto", JSON.stringify(contactos));
  
      mensajeDiv.innerHTML = `
        <div class="alert alert-success mt-3">
          <h5>Gracias por tu mensaje, ${nombre} 🙌</h5>
          <p>Nos pondremos en contacto contigo pronto.</p>
        </div>
      `;
  
      form.reset();
    });
  });