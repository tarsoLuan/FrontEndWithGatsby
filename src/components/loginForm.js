import React from "react"
import axios from 'axios';
import { useState } from "react";
import {navigate} from 'gatsby';

export default function LoginForm({stateChanger}) {
    const [inputs, setInputs] = useState({
        email: null,
        password: null
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();

        let isEmpty = false;

        for (let key in inputs) {
            if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                isEmpty = true;
            }
        }

        if(isEmpty === true){
            alert('Preencha todos os campos');
        } else {
            axios.post('http://192.168.0.104:8080/api/user', inputs).then(response => {
                const user = response.data;
                window.localStorage.setItem("user", JSON.stringify(user))
                navigate('/home');
            })
            .catch(error => {
                alert(error.response.data.message)
            });
        }
    }

    return (
        <div className="login__card">
            <p className="login__text-default">Entre na sua</p>
            <p className="login__text-default">conta</p>
            <p className="login__text-italic">e acompanhe suas leituras</p>
            <form className="form__section">
                <input className="input__box" name="email" placeholder="E-mail" onChange={handleChange} value={inputs.email || ""}/> <br></br>
                <input className="input__box" name="password" placeholder="Senha" onChange={handleChange} value={inputs.password || ""}/> <br></br>
                <div className="button__section">
                    <input type="button" className="form__button" onClick={handleSubmit} value="Login"/>
                </div>
            </form>
            <div className="component__footer">
                <p className="footer__text">Não é cadastrado?</p>
                <a className="footer__text-link" onClick={() => stateChanger(true)}>Crie sua conta</a>
            </div>
        </div>
    )
}