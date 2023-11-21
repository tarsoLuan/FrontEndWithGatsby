import React, {useState} from "react"
import "./styles/addContent.css";
import axios from 'axios';

export default function AddBook({pageChanger}) {
    const [hasImage, setHasImage] = useState(false);

    const [inputs, setInputs] = useState({
        name: null,
        author: null,
        description: null,
        imageBlob: null
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }

    const handleSaveBook = () => {
        console.log(inputs);
        let isEmpty = false;

        for (let key in inputs) {
            if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                isEmpty = true;
            }
        }

        if(isEmpty === true){
            alert('Preencha todos os campos (incluindo a imagem)');
        } else {
            axios.post('https://192.168.0.104:8080/api/book/create', inputs).then(response => {
                console.log(response);
                pageChanger(0);
            })
            .catch(error => {
                alert(error.response.data.message)
            });
        }
    }

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

    return (
        <div>
            <div className="modal__content">
                <p className="modal__title-large">Adicione um livro</p>
                <div className="modal__content-body">
                    <div className="modal__content-body__image">
                        {hasImage ? 
                            <img className="book__cover-image" src={`data:image;base64,${inputs.imageBlob}`} alt="Book" /> :
                            <div className="custom__file-upload">
                                <label for="file-upload" className="custom__file-upload">
                                    Adicionar imagem
                                </label>
                                <input id="file-upload" type="file" accept="image/png, image/jpg" onChange={onImageChange}/>
                            </div>
                        }                       
                    </div>
                    <div className="modal__content-body__info">
                        <form>
                            <input className="input__box" name="name" placeholder="Título" onChange={handleChange} value={inputs.name || ""}/> <br></br>
                            <input className="input__box" name="author" placeholder="Autor" onChange={handleChange} value={inputs.author || ""}/> <br></br>
                            <textarea className="input__box text__area" type="textarea" name="description" placeholder="Descrição" onChange={handleChange} value={inputs.description || ""}/> <br></br>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal__content-footer">
                <button className="button-red" type="button" onClick={handleSaveBook}>Salvar</button>
            </div>
        </div>
    )
}