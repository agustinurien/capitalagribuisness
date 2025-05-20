import React from "react";
import "../components/contact.css";

const Contact = () => {
  return (
    <div className="formContainer">
      <h3>¿ALGUNA PREGUNTA O INQUIETUD?</h3>
      <h2>CONSULTANOS</h2>
      <div className="form">
        <form>
          <input type="text" placeholder="Nombre y Apellido" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Teléfono" />
          <textarea name="" id="" placeholder="Consulta..."></textarea>

          <button>CONSULTAR</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
