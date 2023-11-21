import React, {useState} from "react"
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import {getUser} from "../auth";
import "./styles/addContent.css";
import axios from 'axios';

export default function AddBook({pageChanger, book}) {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#E0DACB',
        }
    });

    const [value, setValue] = useState(0);
   
    const user = getUser();

    const [inputs, setInputs] = useState({
        userId: null,
        bookId: null,
        rating: null,
        review: null
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]: value}))
    }

    const handleSaveReview = () => {
        inputs.userId = user.id;
        inputs.bookId = book.id;

        console.log(inputs);

        let isEmpty = false;

        for (let key in inputs) {
            if(inputs[key] === null || inputs[key] === undefined || inputs[key] === ''){
                isEmpty = true;
            }
        }

        console.log(isEmpty);

        if(isEmpty === true){
            alert('Preencha todos os campos');
        } else {
            console.log('integrando')
            axios.post('https://192.168.0.104:8080/api/review/create', inputs).then(response => {
                console.log(response);

                pageChanger(0);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }


    return (
        <div>
            <div className="modal__content">
                <div className="modal__content-body">
                    <div className="modal__content-body__image">
                        <img className="book__cover-image" src={`data:image;base64,${book.imageBlob}`} alt="Book" />          
                    </div>
                    <div className="modal__content-body__info">
                      <p>Eu li...</p>
                      <p className="book__title">{book.name}, {book.author}</p>
                      <div className="rating__section">
                        <Typography component="legend">Nota</Typography>
                        <StyledRating
                            name="simple-controlled"
                            value={value}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            onChange={(event, newValue) => {
                                setInputs(values => ({...values, rating: newValue}));
                                setValue(newValue);
                            }}
                        />
                        <textarea className="input__box text__area" type="textarea" name="review" placeholder="Escreva sua review" onChange={handleChange} value={inputs.review || ""}/> <br></br>
                      </div>
                    </div>
                </div>
            </div>
            <div className="modal__content-footer">
                <button className="button-red" type="button" onClick={handleSaveReview}>Salvar</button>
            </div>
        </div>
    )
}