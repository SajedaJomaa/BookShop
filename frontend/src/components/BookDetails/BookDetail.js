import React, { useState, useContext } from 'react';
import parse from 'html-react-parser';
import Modal from '../Common/Modal.js';
import BookContext from '../../contexts/BookContext.js';
import classes from './BookDetail.module.css';

export default function BookDetail({ book }) {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(book.volumeInfo.averageRating || 0);
    const [hover, setHover] = useState(book.volumeInfo.averageRating || 0);
    const [isLoading, setIsLoading] = useState(false);
    const { isBuying, buyBook } = useContext(BookContext);

    const handleBuyBook = () => {
        setIsLoading(true);
        setTimeout(() => {
            buyBook(book);
            setShowModal(false);
            setIsLoading(false);
        }, 5000);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const { volumeInfo } = book;
    const { title, description, authors, pageCount, imageLinks } = volumeInfo;
    const autheName = authors ? authors.join(', ') : 'Unknown'
    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.siteName}>Design Books</h1>

            </div>
            <section className={classes.bookdetail}>
                <div className={classes.bookinfo}>
                    {imageLinks && imageLinks.thumbnail && (
                        <img src={imageLinks.thumbnail} alt={title} />
                    )}
                    <div className={classes.bookdata}>
                        <h1>{title}</h1>
                        <p>Author: {autheName}</p>
                        <p>Page Count: {pageCount}</p>

                        <p>Rate this book:</p>
                        <div className={classes.starrating}>
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={index}
                                            onClick={() => handleRatingChange(index)}
                                        />
                                        <i
                                            className={index <= (hover || rating) ? "fas fa-star" : "far fa-star"}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        ></i>
                                    </label>
                                );
                            })}
                        </div>
                        <div className={classes.bookdetailbutton}>
                            <button onClick={openModal} className={classes.bookbuttonbuy}>Buy</button>

                            <input type="checkbox" id="like-checkbox" className={classes.likecheckbox} />
                            <label htmlFor="like-checkbox" className={classes.buttonlike}>
                                <i className="fa fa-heart"></i>
                                <span>Like</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classes.bookdescription}>
                    <p>{parse(description || '')}</p>
                </div>

                <Modal open={showModal} onClose={closeModal}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Confirm Purchase</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to buy this book?</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleBuyBook} disabled={isLoading || isBuying}>
                                {isLoading ? <div className={classes.spinner}></div> : <p>Yes</p>}
                            </button>
                            <button onClick={closeModal}><p>No</p></button>
                        </div>
                    </div>
                </Modal >
            </section >
        </>
    );
}
