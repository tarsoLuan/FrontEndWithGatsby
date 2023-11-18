import React, {useState, useRef} from "react"
import axios from "axios";
import SearchableDropdown from "./searchableDropdown";

export default function BookSearch({pageChanger, bookChanger}) {
    let doneTypingInterval = 1000;
    let typingTimer;

    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");

    const startReview = (option) => {
        const foundBook = results.find((element) => element.name === option);
        bookChanger(foundBook);
        pageChanger(2);
    }

    const handleInputChange = (val) => {
        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            if(val.length > 0)
                handleSearch(val); 

        }, doneTypingInterval); 
    }

    const handleSearch = (input) => {
        console.log('searching...');
        axios.get('http://192.168.0.104:8080/api/book', {params: {name: input, limit: 3}}).then((response) => {
            console.log(response);
            if(response.data.length > 0) {
                setResults(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <div className="modal__content">
                <p className="modal__title">Adicione uma nova leitura</p>
                <SearchableDropdown
                    options={results}
                    label="name"
                    id="id"
                    selectedVal={value}
                    handleChange={(val) => {setValue(val); handleInputChange(val)}}
                    selectedOption={(option) => {startReview(option)}}
                />
            </div>
            <div className="modal__content-footer">
                não encontrou o livro? Adicione ele <a className="modal__content__footer-link" onClick={() => pageChanger(1)}>aqui</a>
            </div>
        </div>
        
    )
}