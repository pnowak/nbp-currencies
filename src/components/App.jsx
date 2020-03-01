import React, { Component } from 'react';
import ListOfAllCurrency from './ListOfAllCurrency';
import CreateNewFavourite from './CreateNewFavourite';

const API = 'https://api.nbp.pl/api/exchangerates/tables/c?format=json';

class NBPCurrenciesApp extends Component {

    state = {
        data: null,
        error: null,
        isLoading: false,
        favourite: []
    };

    componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                const currencies = data[0].rates;

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

    add = (event) => {
        const target = event.target;
        const value = target.value;
        
        this.addToFavourite(target, value);
    }

    remove = (event) => {
        const target = event.target;
        const value = target.value;

        this.removeFromFavourite(value);
    }

    addToFavourite = (target, value) => {
        const arrayOfFavourite = [value, ...this.state.favourite];
        
        this.setState({ favourite: arrayOfFavourite});

        this.disableAddButton(target);
    }

    removeFromFavourite = (value) => {
        const filterFavourite = this.state.favourite.filter((item) => {
            return item !== value;
        });

        this.setState({ favourite: filterFavourite });

        this.enableAddButton(value);
    }

    removeAll = () => {
        const copyOfFavourite = [...this.state.favourite];

        copyOfFavourite.forEach((favourite) => {
            this.enableAddButton(favourite);
        })

        this.setState((state) => {
            state.favourite.length = 0;
            
            return {
                favourite: state.favourite
            }
        });
    }

    disableAddButton(target) {
        target.disabled = true;
    }

    enableAddButton(value) {
        const button = document.querySelector(`ul.list button[value='${value}']`);
        
        button.disabled = false;
    }

    render() {
        const { data, favourite, error, isLoading } = this.state;

        const favouriteList = favourite.map((value) => {
            return <CreateNewFavourite value={value} onRemove={this.remove} />;
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
                    <ListOfAllCurrency currenciesList={data} onAdd={this.add} />
                    <div className="list">
                        <ul>{favouriteList}</ul>
                        {
                            this.state.favourite.length > 0 &&
                            <button className="removeAll" type="button" onClick={this.removeAll}>{'Remove All'}</button>
                        }
                    </div>
                </section>
            );
        }
    }
}

export default NBPCurrenciesApp;
