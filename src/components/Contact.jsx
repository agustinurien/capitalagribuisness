import React from "react";
import emailjs, { send } from "emailjs-com";
import "../components/contact.css";

const Contact = () => {
  const handlesubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const templateParams = {
      user_name: form.name.value,
      user_number: form.number.value,
      user_email: form.email.value,
      message: form.message.value,
      to_email: "agus.urien3@gmail.com",
      reply_to: form.email.value,
    };

    const serviceID = "service_3sa0xop";
    const templateID = "template_f1rbdvb";
    const publicKey = "9kc7Ztm86wijQM7vx";

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );

    form.reset();
  };
  return (
    <div className="formContainer">
      <h3>¿ALGUNA PREGUNTA O INQUIETUD?</h3>
      <h2>CONSULTANOS</h2>
      <div className="form">
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre y Apellido"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="number"
            id="number"
            name="number"
            placeholder="Teléfono"
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Consulta..."
            required
          ></textarea>

          <button>CONSULTAR</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
