import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSelectedBook } from '../../services/api-call.js';
import BookDetail from './BookDetail.js';

export default function FetchBookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchSelectedBook(id);
            setBook(data);
        } catch (error) {
            setError('Error fetching book details. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <BookDetail book={book} />;
}

