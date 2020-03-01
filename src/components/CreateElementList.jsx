import React from 'react';
import PropTypes from 'prop-types';

const CreateElementList = ({value, onAction, desc}) => (
    <li>
        <span>{value}</span>
        <button type="button" value={value} onClick={onAction}>{desc}</button>
    </li>
);

CreateElementList.propTypes = {
    value: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
    desc: PropTypes.string.isRequired
};

export default CreateElementList;
