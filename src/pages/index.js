import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Layout from "../components/layout"
import book from '../images/book.png'
import profile from '../images/profile.png'
import "../components/styles/index.css";

const IndexPage = () => {
  const [data, setData, token] = useState({});

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#E0DACB',
    }
  });

  useEffect(() => {

    axios.get('http://192.168.0.105:8080/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados');
        console.error(error);
      });
    }, []);

  return (
    <Layout>
      <div className='title__section'>
        <h1 className='text__title'>Seja bem vindo de volta, Luan!</h1> 
        <h1 className='text__title'>Veja os últimos livros que você leu:</h1>
      </div>
      
      <div className='books__section'>
        <div className='book__card'>
            <img className='book__image' src={book} alt='book'></img>
            <div className='book__card-info'>
              <Typography component="legend"></Typography>
              <StyledRating name="read-only" value='3' readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
            </div>
        </div>
      </div>

      <div className='lastReview__section'>
        <h3>Última resenha</h3>
        <div className='speech-bubble'>
          <div className='icon__section'>
            <img src={profile}></img>
          </div>
          <div className='text__section'>
            <p className='text__section-title'>KAFKA ON THE SHORE</p>
            <p  className='text__section-review'>Este é o primeiro livro que leio em inglês, gostei da experiência. Murakami continua me surpreendendo com sua escrita, esse livro foi o mais desafiador até agora, os personagens me surpreenderam muito.</p>
            <Typography component="legend"></Typography>
            <StyledRating name="read-only" value='3' readOnly size="small" emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Início</title>
