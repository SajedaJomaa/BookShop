
import { useNavigate } from 'react-router-dom';
import SearchLogic from '../Search/SearchLogic.js';
import classes from './ShowAvailableBooks.module.css';
import { useState } from 'react';

export default function ShowAvailableBooks({ booksData, lastImageRef, isLoading }) {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    function handleSelectBook(id) {
        navigate(`/book/${id}`);
    }

    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.siteName}>Design Books</h1>
                <div>
                    <SearchLogic onResultsChange={setSearchResults} />
                </div>
            </div>
            <section className={classes.bookscategory}>
                {(searchResults.length > 0 ? searchResults : booksData).length > 0 ? (
                    <ul className={classes.books}>
                        {(searchResults.length > 0 ? searchResults : booksData).map((book, index) => {
                            const title = book.volumeInfo.title || 'No Title';
                            if (title === 'No Title') {
                                return null;
                            }

                            return (
                                <li key={`${book.id}-${index}`} className={classes.bookitem}>
                                    {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
                                        <button onClick={() => handleSelectBook(book.id)}>
                                            {isLoading ? (
                                                <div className={classes.skeletoncard}>
                                                    <div className={classes.skeletonimage}></div>
                                                    <div className={classes.skeletontitle}></div>
                                                </div>
                                            ) : (
                                                <>
                                                    <img
                                                        src={book.volumeInfo.imageLinks.thumbnail}
                                                        alt={`Book ${index + 1}`}
                                                        ref={index === (searchResults.length > 0 ? searchResults : booksData).length - 1 ? lastImageRef : null}
                                                    />
                                                    <p className={classes.booktitle}>{title}</p>
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </>
    );
}

