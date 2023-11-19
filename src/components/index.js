import React, {useState} from "react";
import logo from '../images/logo.png'
import LoginForm from './loginForm'
import SigninForm from './signinForm'
import { GatsbyImage} from 'gatsby-plugin-image'
import "../components/styles/index.css";


const siginImagesUrl = ['https://i.pinimg.com/564x/f4/83/01/f4830119a23ffff1dac898d01ddba6b4.jpg', 'https://i.pinimg.com/564x/0e/c4/5b/0ec45b5e2d9f0a9a224e447b957d05b7.jpg', 'https://m.media-amazon.com/images/I/91163i7ah-L._AC_UF1000,1000_QL80_.jpg', 'https://cdn.kobo.com/book-images/8f6b906a-15dd-4a5e-a294-52cd4dfc0af9/1200/1200/False/norwegian-wood-2.jpg'];
const loginImagesUrl = ['https://i.pinimg.com/originals/34/75/a1/3475a1656aef2620896bc6b4960e62ce.jpg', 'https://onegrandbooks.com/wp-content/uploads/2020/11/A-Room-of-Ones-Own-900x1353.jpg', 'https://media.npr.org/assets/img/2020/06/24/71d6xhjxzql_custom-635e36c2e88fc05f264a0c6af71675172318c19f-s1100-c50.jpg', 'https://bayrockbayrock.files.wordpress.com/2015/06/9012566662_82f026ba81_k.jpg'];
const delay = 5000;

export default function Login({ children }) {
    const [index, setIndex] = React.useState(0);
    const[state, setState] = useState(false);
   
    React.useEffect(() => {
        setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === siginImagesUrl.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
        return () => {};
    }, [index]);
    
    return (
        <div className='main'>
            <div className='title__section'>
                <div className="logo__section">
                    <div className="header__item-logo">
                        <img className="image__logo" src={logo} alt="mono"></img>
                    </div>
                    <a className="header__item-title">mono</a>
                </div>
                
                <div className="login__section">
                    {state ? <SigninForm stateChanger={setState}/> :  <LoginForm stateChanger={setState}/>}
                </div>
            </div>
            <div className="slideshow">
                <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    {state ? loginImagesUrl.map((image, index) => (
                    <img className="slide" key={index} src={ image } alt="mono"></img >
                    
                        )) :
                        siginImagesUrl.map((image, index) => (
                            <img className="slide" key={index} src={ image } alt="mono"></img >
                            
                    ))}
                </div>
            </div>
        </div>
    )
}