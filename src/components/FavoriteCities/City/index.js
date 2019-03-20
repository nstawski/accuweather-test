import React, { Component } from 'react';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city
        }
    }
    
    shouldComponentUpdate(nextProps){
        return nextProps.city !== this.state.city;
    }
    
    componentDidUpdate(prevProps, nextProps){
        if(prevProps.city !== this.props.city){
            this.setState({
                city: this.props.city
            });
        }
    }
    render() {
        return ( 
            <div className="City">
            {this.state.city && Object.keys(this.state.city).indexOf('name') !== 'undefined' ? this.state.city.name : "Loading..."}
            {this.state.city && Object.keys(this.state.city).indexOf('state') !== 'undefined' ? `, ${this.state.city.state}` : ""}
            {this.state.city && Object.keys(this.state.city).indexOf('icon') !== 'undefined' ? (
                <img src={`https://developer.accuweather.com/sites/default/files/${this.state.city.icon.toString().length === 2 ? this.state.city.icon : "0" + this.state.city.icon}-s.png`}/>) : ""}
            <div className="City--delete" onClick={() => this.props.handleDelete(this.state.city.key)}>X</div>
            </div>
        );
    }
}

export default City;
