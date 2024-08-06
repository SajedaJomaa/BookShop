
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.js';

export default function SearchLogic({ onResultsChange }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const fetchSearchResults = useCallback(async (query) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            const data = await response.json();
            setSearchResults(data.items || []);
            onResultsChange(data.items || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }, [onResultsChange]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsDropdownVisible(value.length > 0);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                fetchSearchResults(query);
            } else {
                setSearchResults([]);
                onResultsChange([]);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [query, fetchSearchResults, onResultsChange]);

    const handleBookSelect = (book) => {
        setQuery(book.volumeInfo.title);
        setIsDropdownVisible(false);
        navigate(`/book/${book.id}`);
    };

    return (
        <div className='resultOutPut'>
            <SearchBar
                query={query}
                isDropdownVisible={isDropdownVisible}
                searchResults={searchResults}
                onInputChange={handleInputChange}
                onBookSelect={handleBookSelect}
            />
        </div>
    );
}
