
import { useState, useEffect, useRef, useCallback } from 'react';
import ShowAvailableBooks from '../ShowData/ShowAvailableBooks.js';
import { fetchAvailableBooks } from '../../services/api-call.js';

export default function BookList() {
    const [booksData, setBooksData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const observer = useRef(null);
    const fetchBookData = async (page) => {
        setIsLoading(true);
        try {
            const resData = await fetchAvailableBooks(page);
            const newBooksData = resData.items.map(item => ({
                id: item.id,
                imageLinks: item.volumeInfo.imageLinks,
                title: item.volumeInfo.title,
                volumeInfo: item.volumeInfo
            }));
            setBooksData(prevData => [...prevData, ...newBooksData]);
        } catch (error) {
            console.error('Error fetching book data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {

        fetchBookData(page);
    }, [page]);

    const lastImageRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading]);

    return (
        <div>
            <ShowAvailableBooks booksData={booksData} lastImageRef={lastImageRef} isLoading={isLoading} />
        </div>
    );
}
