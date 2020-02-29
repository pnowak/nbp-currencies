import React, { Component } from 'react';
import ListOfAllCurrency from './ListOfAllCurrency';
import CreateNewFavorite from './CreateNewFavorite';

const API = 'https://api.nbp.pl/api/exchangerates/tables/c?format=json';

class NBPCurrenciesApp extends Component {

    state = {
        data: null,
        error: null,
        isLoading: false,
        favorite: []
    };

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                console.log(data, data[0].rates);
                const currencies = data[0].rates;

                // this.setState((state, props) => {
                //     return {
                //         data: currencies,
                //         isLoading: true
                //     }
                // });
                this.setState({
                    data: currencies,
                    isLoading: true
                });
            })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    addToFavorite = (event) => {
        event.preventDefault();

        const value = event.target.value;
        const arrayOfFavorite = [value, ...this.state.favorite];
        
        this.setState({favorite: arrayOfFavorite});
    }

    removeFromFavorite = (event) => {
        event.preventDefault();

        const value = event.target.value;

        const filterFavorite = this.state.favorite.filter((item) => {
            return item !== value;
        });
        console.log(value, filterFavorite);
        // const arrayOfFavorite = [target, ...this.state.favorite];

        this.setState({ favorite: filterFavorite });
    }

    render() {
        const { data, favorite, error, isLoading } = this.state;

        const favoriteList = favorite.map((value) => {
            // return <CreateNewFavorite value={ value } onRemove={this.removeFromFavorite} />;
            return (
                <li key={value}>
                    <span className="">{value}</span>
                    <button type="button" className="inList" value={value} onClick={this.removeFromFavorite}>{'Remove'}</button>
                </li>
            );
        });

        if (error) {
            return <div>Error: {error.message}</div>;

        } else if (!isLoading) {
            return <div>Loading...</div>;

        } else {
            return (
                <section className="container">
                    <ListOfAllCurrency currenciesList={data} onAdd={this.addToFavorite} />
                    <ul>{favoriteList}</ul>
                </section>
            );
        }
    }
}

export default NBPCurrenciesApp;
