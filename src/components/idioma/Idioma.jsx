import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n";

const Idioma = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("es");

  useEffect(() => {
    const getLangFromPath = () => {
      const pathParts = window.location.pathname.split("/");
      const langInPath = pathParts[1];
      return langInPath === "en" || langInPath === "es" ? langInPath : "es";
    };
    const initialLang = getLangFromPath();
    setSelectedLang(initialLang);
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    const pathParts = window.location.pathname.split("/");
    if (pathParts[1] === "en" || pathParts[1] === "es") {
      pathParts[1] = lang;
    } else {
      pathParts.splice(1, 0, lang);
    }
    const newPath = pathParts.join("/") || "/";
    window.location.pathname = newPath;
  };

  return (
    <select onChange={handleLanguageChange} value={selectedLang}>
      <option value="es">🇦🇷 Español</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
};

export default Idioma;
