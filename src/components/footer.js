import React from "react"
import "./styles/footer.css";
import footer from '../images/footer.png'

export default function Footer(props) {
    return (
        <div className="footer__layout-grid">
            <nav className="footer__layout-nav">
                <a className="footer__item-books">livros</a>
                <a className="footer__item-profile">perfil</a>
                <a className="footer__item-contact">contato</a>
                <a className="footer__item-logoff">logoff</a>
            </nav>
            <div className="footer__item-image">
                    <img className="footer__image-logo" src={footer} alt="mono"></img>
            </div>
        </div>
    )
}