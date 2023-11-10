import React, { useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Layout from "../components/layout"
import profile from '../images/profile.png'
import "../components/styles/index.css";


const IndexPage = () => {
  const [items, setItems] = useState({});

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#E0DACB',
    }
  });

  useEffect(() => {
   
    axios.get('http://192.168.0.103:8080/api/review/last', {params: {id: 1}}).then(response => {
      setItems(response.data);
      console.log(response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados');
        console.error(error);
      });
   
  }, []);

  let allItems = [];

  for(let i = 0; i < items.length; i++){
    allItems.push(
    <div className='book__card' key={i}>
      <img className='book__image' src={`data:image;base64,${items[i].Book.imageBlob}`} alt='book'></img>
      <div className='book__card-info'>
        <Typography component="legend"></Typography>
        <StyledRating name="read-only" value={items[i].rating} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
      </div>
    </div>
  )
  }

  console.log(allItems)

  return (
    <Layout>
      <div className='title__section'>
        <h1 className='text__title'>Seja bem vindo de volta, Luan!</h1> 
        <h1 className='text__title'>Veja os últimos livros que você leu:</h1>
      </div>
      <div className='books__section'>
        {allItems}
      </div>
      <div className='lastReview__section'>
        <h3>Última resenha</h3>
        <div className='speech-bubble'>
          <div className='icon__section'>
            <img src={profile} alt='profile'></img>
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
