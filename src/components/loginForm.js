import React from "react"
import axios from 'axios';
import { useState } from "react";
import {navigate} from 'gatsby';
import {handleLogin} from "../auth";

export default function LoginForm({stateChanger}) {
    const [inputs, setInputs] = useState({
        email: null,
        password: null
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();
        setIsLoading(true)

        let isEmpty = false;

        for (let key in inputs) {
            if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                isEmpty = true;
            }
        }

        if(isEmpty === true){
            alert('Preencha todos os campos');
            setIsLoading(false)
        } else {
            axios.post('https://monoserver.tarso.cloud/api/user', inputs)
            .then(res=>res.data)
            .then(data=> {
                console.log(data);
                handleLogin(data);
                setIsLoading(false);
                navigate('/home');
            })
            .catch(error => {
                setIsLoading(false);
                if(error.response === undefined){
                    alert(error.message);
                } else {
                    alert(error.response.data.message)
                }
               
            });
        }
    }

    return (
        <div className="login__card">
            <p className="login__text-default">Entre na sua</p>
            <p className="login__text-default">conta</p>
            <p className="login__text-italic">e acompanhe suas leituras</p>
            <form name="form-hook" className="form__section">
                
                <input className="input__box" type="email" name="email"
                       placeholder="E-mail" onChange={handleChange} value={inputs.email || "" }/> <br></br>
                <input className="input__box" name="password" placeholder="Senha" onChange={handleChange} value={inputs.password || ""}/> <br></br>
                <div className="button__section">
                    <input type="button" className="form__button" onClick={handleSubmit} disabled={isLoading} value="Login"/>
                </div>
            </form>
            <div className="component__footer">
                <p className="footer__text">Não é cadastrado?</p>
                <a className="footer__text-link" onClick={() => stateChanger(true)}>Crie sua conta</a>
            </div>
        </div>
    )
}