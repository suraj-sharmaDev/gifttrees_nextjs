import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => (
    <span
        className="form-error text-left">
        <i className="fas fa-exclamation-circle" /> {message}
    </span>
);

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;