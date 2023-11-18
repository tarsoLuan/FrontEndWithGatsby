import React, {useState} from "react";
import "./styles/layout.css";
import { styled } from '@mui/material/styles';
import { Link} from 'gatsby'
import logo from '../images/logo.png'
import AddContent from "./addContent";
import Footer from "./footer"



export default function Layout({ children }) {
    let user;

    if (typeof window !== `undefined`){
        user = JSON.parse(window.localStorage.getItem("user"));
    }
    
    const [open, setOpen] = React.useState(false);

    const StyledLink = styled(props => <Link {...props} />)`
        color: #E0DACB;
        text-decoration: none;
    `;

    const handleOpen = () => setOpen(true);

  return (
    <main className="main__layout">
        <div className="header__layout-grid">
            <nav className="header__layout-nav">
                <StyledLink to="/home" className="home__button">
                    <div className="header__item-logo">
                        <img className="image__logo" src={logo} alt="mono"></img>
                    </div>
                    <a className="header__item-title">mono</a>
                </StyledLink>
                
                <StyledLink to="/profile" className="header__item-username">
                    <a >{user.name} </a>
                </StyledLink>
                <a className="header__item-books">LIVROS </a>
                <form className="header__item-searchbar">
                    <input type="search" name="search"></input>
                    <button type="submit">Search</button>
                </form>
                <button className="button-red" type="button" onClick={handleOpen}>+ livro</button>
            </nav>
        </div>
        <div className="main__content">
            {open ? <AddContent open={open} stateChanger={setOpen}/> :  <div></div>}
            {children}
        </div>
        <Footer/>
    </main >
  );
}