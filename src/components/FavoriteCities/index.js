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
                <h1 className="FavoriteCities--header">{text.favoriteCities}
                {this.props.cities && this.props.cities.length ? (
                <div 
                    className="FavoriteCities--unitBlock" 
                    onClick={() => this.setState({"unit": this.unitSwitch[this.state.unit]})}>Unit:&nbsp;
                    <div className="FavoriteCities--unit">
                        {this.state.unit === "Imperial" ? "F" : "C"}
                    </div>
                </div>
                ) : ""}
                </h1>
                {this.props.cities && this.props.cities.length ? (
                    <div>
                        
                        <div className="FavoriteCities--list">
                            {this.props.cities.map((city, key) => (
                                <City 
                                    key={key} 
                                    city={city} 
                                    unit={this.state.unit} 
                                    handleDelete={this.props.handleDelete}/>
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="FavoriteCities--empty">You haven't added a favorite city yet.</div>
                )}
            </div>
        );
    }
}

export default FavoriteCities;
