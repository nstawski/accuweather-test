import React, { Component } from 'react';
import City from './City';
import text from '../../text.json';

class FavoriteCities extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div className="FavoriteCities">
                <h1 className="FavoriteCities--header">{text.favoriteCities}</h1>
                <div className="FavoriteCities--list">
                    {this.props.cities.map((city, key) => (<City key={key} city={city} unit={"1"} deleteFn={this.props.handleDelete}/>))}
                </div>
            </div>
        );
    }
}

export default FavoriteCities;
