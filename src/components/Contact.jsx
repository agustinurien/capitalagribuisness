import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "../components/contact.css";

const Contact = ({ lang }) => {
  const [translations, setTranslations] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const templateParams = {
      user_name: form.name.value,
      user_number: form.number.value,
      user_email: form.email.value,
      message: form.message.value,
      to_email: "advisory@capitalagribusiness.com",
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

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(
          `../i18n/locales/${lang}/translation.json`
        );
        setTranslations(translationModule.default);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };

    loadTranslations();
  }, [lang]);

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="formContainer">
      <h3>{translations.contacto_pregunta}</h3>
      <h2>{translations.contacto_llamanos}</h2>
      <div className="form">
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={translations.form_nombre}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder={translations.form_email}
            required
          />
          <input
            type="number"
            id="number"
            name="number"
            placeholder={translations.form_telefono}
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder={translations.form_consulta}
            required
          ></textarea>

          <button>{translations.consultar}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
