import React from 'react';
import PropTypes from 'prop-types';

const CreateNewFavorite = ({value, onRemove}) => (
    <li key={value}>
        <span>{value}</span>
        <button type="button" value={value} onClick={onRemove}>{'Add'}</button>
    </li>
);

CreateNewFavorite.propTypes = {
    value: PropTypes.string.isRequired
};

export default CreateNewFavorite;
