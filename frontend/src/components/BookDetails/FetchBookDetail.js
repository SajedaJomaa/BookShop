import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedBook } from '../../services/api-call.js';
import BookDetail from './BookDetail.js';

export default function FetchBookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const data = await fetchSelectedBook(id);
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return <BookDetail book={book} />;
}