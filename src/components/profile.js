import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from "../components/loading";
import Book from '../components/book';
import SpeechBubble from './speechBubble';
import {getUser} from "../auth";
import "../components/styles/profile.css";

export default function Profile({}) {
    const user = getUser();
    
    const [items, setItems] = useState({});
    const [reviews, setReviews] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const card_style = {
        'text-align': 'center',
        width: '100px',
        height: '200px',
        margin: '10px'
    }

    useEffect(() => {
        setIsLoading(true);
       
        axios.get('https://monoserver.tarso.cloud/api/review/last', {params: {id: user.id, limit: 3}}).then(response => {
          setItems(response.data);
          
          setIsLoading(false);
          })
          .catch(error => {
            console.error('Ocorreu um erro ao buscar os dados');
            console.error(error);
        });

        axios.get('https://monoserver.tarso.cloud/api/review/lastNotNull', {params: {id: user.id, limit: 4}}).then(response => {
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
          <Book key={i} items={items} i={i} card_style={card_style} star_size='small'/>
        )
      }

      let allReviews = [];

      for(let i = 0; i < reviews.length; i++){
        allReviews.push(
          <SpeechBubble key={i} review={reviews[i]} />
        )
      }


    return (	
        <div className="profile__content">
            <div className="left__content">
                <div className="profile__information">
                    <div className="profile__image-section">
                        <img className="profile__image" src={`data:image;base64,${user.imageBlob}`} alt="Profile" />
                    </div>
                    <div className="profile__info">
                        <h3>{user.name}</h3>
                        <div className='metrics__section'>
                            <div className='metrics__section-item'>
                                <h3 className='metrics__section-item-value'>10</h3>
                                <h3 className='metrics__section-item-title'>livros</h3>
                            </div>
                            <div className='metrics__section-item'>
                                <h3 className='metrics__section-item-value'>4</h3>
                                <h3 className='metrics__section-item-title'>este ano</h3>
                            </div>
                            <div className='metrics__section-item'>
                                <h3 className='metrics__section-item-value'>8</h3>
                                <h3 className='metrics__section-item-title'>resenhas</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="books__section-profile">
                    {isLoading ? <Loading /> :  allItems}
                </div>
            </div>
            <div className="right__content">
                <h1 className='reviews__section'>
                    Suas últimas resenhas:
                </h1>
                <div className='reviews__section'>
                    {allReviews}
                </div>
                <div className='link__white'>
                    <a>Ver mais...</a>
                </div>
                
                
            </div>
        </div>
    )
}