import { useState } from "react";
import { FaCross, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbarHamburguesa.css"
import { IoCloseSharp } from "react-icons/io5";


const NavbarHamburguesa = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <li><a href="/finanzas/Finanzas">FINANZAS</a></li>
                        <li><a href="/agronegocios/Agronegocios">AGRONEGOCIOS</a></li>
                        <li><a href="/Nosotros">NOSOTROS</a></li>
                        <li><a href="/Noticias">NOTICIAS</a></li>
                        <li><a href="/Contact">CONTACTO</a></li>
                    </ul>
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
