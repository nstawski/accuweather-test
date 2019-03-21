import React, { Component } from 'react';
import text from '../../text.json';
import './index.scss';

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
        this.props.handleClick(this.state.city);
    }
    render() {
        return ( 
            <div className="CitySearch">
                <input 
                    type = "text"
                    className="CitySearch--input"
                    value = { this.state.city }
                    onChange = { this.handleChange }>
                </input>
                <button 
                    className = "CitySearch--button"
                    onClick = { this.handleClick }>
                    {text.searchAndAdd}
                </button>
            </div>
        );
    }
}

export default CitySearch;
