import React from "react"
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import "./styles/book.css";

export default function Book({items, i, card_style, star_size}) {

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#E0DACB',
        }
      });
    return (
        <div className='book__card' style={card_style} key={i}>
            <img className='book__image' src={`data:image;base64,${items[i].Book.imageBlob}`} alt='book'></img>
            <div className='book__card-info'>
                <Typography component="legend"></Typography>
                <StyledRating name="read-only" value={items[i].rating} size={star_size} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
            </div>
        </div>
    )
}