import React from "react"
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import "./styles/speechBubble.css";

export default function SpeechBubble({review}) {

    const user = JSON.parse(window.localStorage.getItem("user"));

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#E0DACB',
        }
    });

    return (
        <div className='speech-bubble'>
          <div className='icon__section'>
            <img className='icon__image' src={`data:image;base64,${user.imageBlob}`}  alt='profile'></img>
          </div>
          <div className='bubble__section'>
            <p className='bubble__section-title'>{review.Book.name}, {review.Book.author}</p>
            <p  className='bubble__section-review'>{review.review}</p>
            <Typography component="legend"></Typography>
            <StyledRating name="read-only" value={review.rating} readOnly size="small" emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
          </div>
        </div>
    )
}