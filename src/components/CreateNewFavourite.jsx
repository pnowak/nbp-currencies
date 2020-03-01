import React from 'react';
import PropTypes from 'prop-types';

const CreateNewFavourite = ({value, onRemove}) => (
    <li key={value}>
        <span>{value}</span>
        <button type="button" value={value} onClick={onRemove}>{'Remove'}</button>
    </li>
);

CreateNewFavourite.propTypes = {
    value: PropTypes.string.isRequired
};

export default CreateNewFavourite;
