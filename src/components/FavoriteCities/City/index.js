import React, { Component } from 'react';
import './index.scss';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            unit: this.props.unit
        }
    }
    
    shouldComponentUpdate(nextProps){
        return nextProps.city !== this.state.city || nextProps.unit !== this.state.unit;
    }
    
    componentDidUpdate(prevProps, nextProps){
        if(prevProps.city !== this.props.city){
            this.setState({
                city: this.props.city
            });
        }
        if(prevProps.unit !== this.props.unit){
            this.setState({
                unit: this.props.unit
            });
        }
    }
    render() {
        return ( 
            <div className="City">
                <div 
                    className="City--name">
                    {this.state.city && Object.keys(this.state.city).indexOf('name') !== 'undefined' ? this.state.city.name : "Loading..."}
                    {this.state.city && Object.keys(this.state.city).indexOf('state') !== 'undefined' ? `, ${this.state.city.state}` : ""}
                </div>
                <div 
                    className="City--temperature">
                    {
                        this.state.city 
                        && Object.keys(this.state.city).indexOf('temperature') !== 'undefined' 
                        ? this.state.city.temperature[this.state.unit]["Value"] : ""
                    } {
                        this.state.city 
                        && Object.keys(this.state.city).indexOf('temperature') !== 'undefined' 
                        ? this.state.city.temperature[this.state.unit]["Unit"] : ""
                    }
                </div>
                <div 
                    className="City--icon">
                    {this.state.city && Object.keys(this.state.city).indexOf('icon') !== 'undefined' ? (
                        <img alt={this.state.city.text} src={`https://developer.accuweather.com/sites/default/files/${this.state.city.icon && this.state.city.icon.toString().length === 2 ? this.state.city.icon : "0" + this.state.city.icon}-s.png`}/>) : ""}
                </div>
                <div 
                    className="City--delete" 
                    onClick={() => this.props.handleDelete(this.state.city.key)}
                >
                    <div className="Delete--button">x</div>
                </div>
            </div>
        );
    }
}

export default City;
