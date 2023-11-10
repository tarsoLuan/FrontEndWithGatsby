import React from "react";
import logo from '../images/logo.png'
import "../components/styles/login.css";

export default function Login({ children }) {
    return (
        <div className='main'>
            <div className='title__section'>
                <div className="header__item-logo">
                    <img className="image__logo" src={logo} alt="mono"></img>
                </div>
                <a className="header__item-title">mono</a>
            </div>
            <div className='carousel__section'>
            </div>
            {children}
        </div>
    )
}