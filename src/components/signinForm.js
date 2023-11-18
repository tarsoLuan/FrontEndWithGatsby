import React from "react"
import axios from 'axios';
import { useState } from "react";

export default function LoginForm({stateChanger}) {
    const [inputs, setInputs] = useState({
        name: null,
        email: null,
        password: null,
        imageBlob: null
    });

    function onImageChange(e) {
        const FR = new FileReader();
        FR.readAsDataURL(e.target.files[0]);
        FR.onload = (e) => {
            const str = e.target.result;
            console.log('str ->', str);
            setInputs(values => ({...values,'imageBlob': str}))
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))

        console.log(inputs);
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();

        let isEmpty = false;

        for (let key in inputs) {
            console.log(key);
            console.log(inputs[key]);
            if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                isEmpty = true;
            }
        }

        if(isEmpty === true){
            alert('Preencha todos os campos');
        } else {
            axios.post('http://192.168.0.104:8080/api/user/create', inputs).then(response => {
                alert('Cadastrado com sucesso');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados');
                alert(error.response.data.message)
                console.error(error);
            });
        }
    }

    return (
        <div className="login__card">
            <p className="login__text-default">Junte-se</p>
            <p className="login__text-default">ao mono</p>
            <p className="login__text-italic">e registe leituras incríveis</p>
            <form className="form__section">
                <input className="input__box" name="name" placeholder="Nome" onChange={handleChange} value={inputs.name || ""}/> <br></br>
                <input className="input__box" name="email" placeholder="E-mail" onChange={handleChange} value={inputs.email || ""}/> <br></br>
                <input className="input__box" name="password" placeholder="Senha" onChange={handleChange} value={inputs.password || ""}/> <br></br>
                <input id="image" type="file" name="imageBlob" accept="image/png, image/jpg" onChange={onImageChange}/>
                <div className="button__section">
                    <input type="button" className="form__button" onClick={handleSubmit} value="Cadastre-se"/>
                </div>
            </form>
            <div className="component__footer">
                <p className="footer__text">Já é cadastrado?</p>
                <a className="footer__text-link" onClick={() => stateChanger(false)}>Faça login</a>
            </div>
        </div>
    )
}