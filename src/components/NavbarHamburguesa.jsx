import { useEffect, useState } from "react";
import { FaCross, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbarHamburguesa.css"
import { IoCloseSharp } from "react-icons/io5";
import Idioma from "./idioma/Idioma";


const NavbarHamburguesa = ({ lang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [translations, setTranslations] = useState(null);
    const supportedLangs = ['es', 'en'];

    useEffect(() => {
        if (!supportedLangs.includes(lang)) {
            console.warn("Idioma no soportado:", lang);
            return;
        }
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

        <nav className="contenedor">
            <div className="contenedorHamburguesa">
                <button onClick={() => setMenuOpen(true)}>
                    <GiHamburgerMenu />
                </button>
            </div>

            {menuOpen && (
                <div className="navbarMenu">
                    <div className="contenedorHamburguesa2">
                        <button onClick={() => setMenuOpen(false)}>
                            <IoCloseSharp />
                        </button>
                    </div>
                    <ul className="navbarLinks2">
                        <li><a href={`/${lang}/finanzas/Finanzas`}>{translations.navbar_inicio}</a></li>
                        <li><a href={`/${lang}/agronegocios/Agronegocios`}>{translations.navbar_agronegocios}</a></li>
                        <li><a href={`/${lang}/Nosotros`}>{translations.navbar_nosotros}</a></li>
                        <li><a href={`/${lang}/Noticias`}>{translations.navbar_noticias}</a></li>
                        <li><a href={`/${lang}/Contact`}>{translations.navbar_contacto}</a></li>
                    </ul>
                    <Idioma client:load />
                    <ul className="navbarSocial2">
                        <li><a href="/contact"><FaInstagram /></a></li>
                        <li><a href="/contact"><FaLinkedin /></a></li>
                        <li><a href="/contact"><FaTwitter /></a></li>
                    </ul>
                </div>
            )}
        </nav>
    )
};

export default NavbarHamburguesa
