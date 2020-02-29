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
        const target = event.target;
        const value = target.value;
        const arrayOfFavorite = [value, ...this.state.favorite];
        
        this.setState({favorite: arrayOfFavorite});

        this.disableAddButton(target);
    }

    remove = (event) => {
        const target = event.target;
        const value = target.value;

        this.removeFromFavorite(value);
    }

    removeFromFavorite = (value) => {
        const filterFavorite = this.state.favorite.filter((item) => {
            return item !== value;
        });

        this.enableAddButton(value);

        this.setState({ favorite: filterFavorite });
    }

    removeAll = () => {
        this.state.favorite.forEach((item, index) => {
            this.removeFromFavorite(item);
        })

        // this.setState({ favorite: filterFavorite });
        // this.enableAddButton(target);
    }

    disableAddButton(target) {
        target.disabled = true;
    }

    enableAddButton(value) {
        const button = document.querySelector(`ul.list button[value='${value}']`);
        
        button.disabled = false;
    }

    render() {
        const { data, favorite, error, isLoading } = this.state;

        const favoriteList = favorite.map((value) => {
            return <CreateNewFavorite value={ value } onRemove={this.remove} />;
            // return (
        //         <li key={value}>
        //             <span className="">{value}</span>
        //             <button type="button" value={value} onClick={this.remove}>{'Remove'}</button>
        //         </li>
            // );
        });

        if (error) {
            return <div>Error: {error.message}</div>;

        } else if (!isLoading) {
            return <div>Loading...</div>;

        } else {
            return (
                <section className="container">
                    <ListOfAllCurrency className="list" currenciesList={data} onAdd={this.addToFavorite} />
                    <div className="list">
                        <ul>{favoriteList}</ul>
                        {
                            this.state.favorite.length > 0 &&
                            <button type="button" onClick={this.removeAll}>{'Remove All'}</button>
                        }
                    </div>
                </section>
            );
        }
    }
}

export default NBPCurrenciesApp;
