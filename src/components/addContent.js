import React, {useState} from "react"
import Modal from '@mui/material/Modal';
import AddBook from "./addBook";
import BookSearch from "./bookSearch";
import AddReview from "./addReview";
import "./styles/addContent.css"

export default function AddContent({stateChanger}) {
    const [page, setPage] = useState(0);
    const [selectedBook, setSelectedBook] = useState(null);

    return (
        <div>
            <Modal
                open={stateChanger}
                onClose={() => stateChanger(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal__body">
                    {page === 0 && <BookSearch pageChanger={setPage} bookChanger={setSelectedBook}/>}
                    {page === 1 && <AddBook pageChanger={setPage}/>}
                    {page === 2 && <AddReview pageChanger={setPage} book={selectedBook} />}
                </div>
            </Modal>
        </div>
        
    )
}