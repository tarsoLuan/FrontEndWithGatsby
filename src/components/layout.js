import React from "react";
import "./styles/layout.css";
import { Link} from 'gatsby'
import logo from '../images/logo.png'
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <main className="main__layout">
        <div className="header__layout-grid">
            <nav className="header__layout-nav">
                <div className="header__item-logo">
                    <img className="image__logo" src={logo} alt="mono"></img>
                </div>
                <a className="header__item-title">mono</a>
                <a className="header__item-username">LUANTARSO </a>
                <a className="header__item-books">LIVROS </a>
                <form className="header__item-searchbar">
                    <input type="search" name="search"></input>
                    <button type="submit">Search</button>
                </form>
                <Link to="/" className="header__item-link">
                    <button className="button-red" type="button">+ livro</button>
                </Link>
            </nav>
        </div>
        <div className="main__content">
            {children}
        </div>
        <Footer/>
    </main >
  );
}