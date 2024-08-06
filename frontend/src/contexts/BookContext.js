
import React, { createContext, useState, useEffect } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [purchasedBooks, setPurchasedBooks] = useState(() => {
        return JSON.parse(localStorage.getItem('purchasedBooks')) || [];
    });

    useEffect(() => {
        localStorage.setItem('purchasedBooks', JSON.stringify(purchasedBooks));
    }, [purchasedBooks]);

    const buyBook = (book) => {
        setPurchasedBooks((prevBooks) => {
            const existingBook = prevBooks.find(item => item.id === book.id);
            if (existingBook) {
                return prevBooks.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevBooks, { ...book, quantity: 1 }];
        });
    };

    const incrementBook = (bookId) => {
        setPurchasedBooks((prevBooks) =>
            prevBooks.map(item =>
                item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementBook = (bookId) => {
        setPurchasedBooks((prevBooks) =>
            prevBooks
                .map(item =>
                    item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <BookContext.Provider value={{ purchasedBooks, buyBook, incrementBook, decrementBook }}>
            {children}
        </BookContext.Provider>
    );
};

export default BookContext;
