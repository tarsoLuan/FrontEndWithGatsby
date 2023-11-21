import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from "../components/loading";
import Layout from "../components/layout"
import SpeechBubble from '../components/speechBubble';
import Book from '../components/book';
import {getUser} from "../auth";
import "../components/styles/home.css";


const IndexPage = () => {
  const [items, setItems] = useState({});
  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const user = getUser();

  const card_style = {
    'text-align': 'center',
    width: '200px',
    height: '300px',
    margin: '20px'
  }

  useEffect(() => {
    setIsLoading(true);
   
    axios.get('https://mono.arduine.cloud/api/review/last', {params: {id: user.id, limit: 5}}).then(response => {
      setItems(response.data);
      console.log(response.data);
      setIsLoading(false);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar os dados');
        console.error(error);
      });

      axios.get('https://mono.arduine.cloud/api/review/lastNotNull', {params: {id: user.id, limit: 1}}).then(response => {
          console.log('response.data ->' + JSON.stringify(response.data));
          setReviews(response.data);
          
          })
          .catch(error => {
            console.error('Ocorreu um erro ao buscar os dados');
            console.error(error);
        });
   
  }, []);

  let allItems = [];

  for(let i = 0; i < items.length; i++){
    allItems.push(
      <Book items={items} i={i} key={i} card_style={card_style} star_size='medium'/>
    )
  }

  let allReviews = [];

  for(let i = 0; i < reviews.length; i++){
    allReviews.push(
      <SpeechBubble key={i} review={reviews[i]} />
    )
  }

  return (
    <Layout>
      <div className='title__section-text'>
        <h1 >Seja bem vindo de volta, {user.name}!</h1> 
        <h1 >Veja os últimos livros que você leu:</h1>
      </div>
      <div className='books__section'>
        {isLoading ? <Loading /> :  allItems}
      </div>
      <div className='lastReview__section'>
        <h3>Última resenha</h3>
        {isLoading ? <Loading /> :  allReviews}
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Início</title>
