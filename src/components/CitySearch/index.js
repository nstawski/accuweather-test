import React, { Component } from 'react';

class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            error: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
        this.setState({
            city: event.target.value
        });
    }
    handleClick() {
        // this.setState({ city: "" });
        this.props.handleClick(this.state.city);
    }
    render() {
        return ( 
            <div className="CitySearch">
                <input 
                    type = "text"
                    value = { this.state.city }
                    onChange = { this.handleChange }>
                </input>
                <button 
                    className = "CitySearch-Submit"
                    onClick = { this.handleClick }>
                    Search and add to favorites 
                </button>
            </div>
        );
    }
}

export default CitySearch;
