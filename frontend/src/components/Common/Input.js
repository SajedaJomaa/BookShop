import React from 'react';
import PropTypes from 'prop-types';
import classes from '../Authentication/signup.module.css';

export default function Input({ label, id, error, ...props }) {
    return (
        <div className={classes.control}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...props}
            />
            <div className={classes.controlerror}>{error && <p>{error}</p>}</div>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
};