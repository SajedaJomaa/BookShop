import React from 'react';

import classes from './Search.module.css';

export default function SearchBar({ query, onInputChange, onSearch }) {

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={classes.searchbox}>
            <button className={classes.btnsearch} onClick={onSearch}>
                <i className="fas fa-search"></i>
            </button>
            <input
                type="text"
                className={classes.inputsearch}
                placeholder="Type to Search..."
                value={query}
                onChange={onInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}
