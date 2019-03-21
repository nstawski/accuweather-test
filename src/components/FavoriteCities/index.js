import React, { Component } from 'react';
import City from './City';
import text from '../../text.json';
import './index.scss';

class FavoriteCities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: "Imperial"
        }
    }
    
    unitSwitch = {
        "Imperial": "Metric",
        "Metric": "Imperial"
    };
    
    render() {
        return ( 
            <div className="FavoriteCities">
                <h1 className="FavoriteCities--header">{text.favoriteCities}</h1>
                <div onClick={() => this.setState({"unit": this.unitSwitch[this.state.unit]})}>{this.state.unit === "Imperial" ? "F" : "C"}</div>
                <div className="FavoriteCities--list">
                    {this.props.cities.map((city, key) => (<City key={key} city={city} unit={this.state.unit} handleDelete={this.props.handleDelete}/>))}
                </div>
            </div>
        );
    }
}

export default FavoriteCities;
