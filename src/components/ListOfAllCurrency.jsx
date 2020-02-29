import React from 'react';
import PropTypes from 'prop-types';

const ListOfAllCurrency = ({ currenciesList, onAdd}) => (
    <ul className="list">
        {currenciesList.map(currency => (
            <li key={ currency.code }>
                <span>{currency.currency}</span>
                <button type="button" value={currency.currency} onClick={onAdd}>{ 'Add' }</button>
            </li>
        ))}
    </ul>
);

ListOfAllCurrency.propTypes = {
    currenciesList: PropTypes.array.isRequired
};

export default ListOfAllCurrency;
