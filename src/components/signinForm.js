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

    const [errors, setErrors] = useState({});
    const [hasImage, setHasImage] = useState(false);

    function onImageChange(e) {
        const FR = new FileReader();
        FR.readAsDataURL(e.target.files[0]);
        FR.onload = (e) => {
            const str = e.target.result;
            const srtArray = str.split(',');
            setInputs(values => ({...values, imageBlob: srtArray[1]}))
            setHasImage(true);
        }
    }

    const validateValues = () => {
        let allErrors = {};

        const userInputs = inputs;
        console.log('userInputs: ', userInputs);
        const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        if(!regex.test(userInputs.email)){
            allErrors.email = "Email não é válido";
        }

        if (userInputs.password.length < 5) {
          allErrors.password = "Senha é muito curta";
        }
        console.log('allErrors: ', allErrors);
        setErrors(allErrors);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let isEmpty = false;

        validateValues();
        console.log(errors);

        if(Object.keys(errors).length > 0){
            for(let key in errors){
                alert(errors[key]);
            }
        } else {
            for (let key in inputs) {
                if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                    isEmpty = true;
                }
            }
    
            if(isEmpty === true){
                alert('Preencha todos os campos');
            } else {
                axios.post('https://192.168.0.104:8080/api/user/create', inputs).then(response => {
                    alert('Cadastrado com sucesso');
                    console.log(response.data);
                    stateChanger(false);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados');
                    alert(error.response.data.message)
                    console.error(error);
                });
            }
        }
    }

    return (
        <div className="login__card">
            <p className="login__text-default">Junte-se</p>
            <p className="login__text-default">ao mono</p>
            <p className="login__text-italic">e registe leituras incríveis</p>
            <form className="form__section-sign">
                <div className="form__image-index">
                    {hasImage ? 
                        <img className="book__cover-image" src={`data:image;base64,${inputs.imageBlob}`} alt="ProfilePic" /> :
                        <div className="custom__file-upload__index">
                            <label for="file-upload" className="custom__file-upload__index">
                                Adicionar imagem
                            </label>
                            <input id="file-upload" type="file" accept="image/png, image/jpg" onChange={onImageChange}/>
                        </div>
                    }                       
                </div>
                <div>
                    <input className="input__box" name="name" placeholder="Nome" onChange={handleChange} value={inputs.name || ""}/> <br></br>
                    <input className="input__box" name="email" placeholder="E-mail" onChange={handleChange} value={inputs.email || ""}/> <br></br>
                    <input className="input__box" name="password" placeholder="Senha" onChange={handleChange} value={inputs.password || ""}/> <br></br>
                </div>
            </form>
            <div className="button__section">
                    <input type="button" className="form__button" onClick={handleSubmit} value="Cadastre-se"/>
                </div>
            <div className="component__footer">
                <p className="footer__text">Já é cadastrado?</p>
                <a className="footer__text-link" onClick={() => stateChanger(false)}>Faça login</a>
            </div>
        </div>
    )
}