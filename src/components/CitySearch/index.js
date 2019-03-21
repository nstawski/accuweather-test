import React, { Component } from 'react';
import text from '../../text.json';
import './index.scss';

class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            error: this.props.error
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onPressEnter = this.onPressEnter.bind(this);
    }
    handleChange(event) {
        this.setState({
            city: event.target.value
        });
    }
    handleClick() {
        this.props.handleClick(this.state.city);
    }
    onPressEnter(event) {
      if(event.keyCode === 13 && event.shiftKey === false) {
        event.preventDefault();
        this.props.handleClick(this.state.city);
      }
    }
    render() {
        return ( 
            <div className="CitySearch">
                <div className="CitySearch--block">
                    <input 
                        type = "text"
                        className="CitySearch--input"
                        value = { this.state.city }
                        onChange = { this.handleChange }
                        onKeyDown = { this.onPressEnter }
                    >
                    </input>
                    <button 
                        className = "CitySearch--button"
                        onClick = { this.handleClick }>
                        {text.searchAndAdd}
                    </button>
                </div>
                <div className="CitySearch--error">{this.props.error}</div>
            </div>
        );
    }
}

export default CitySearch;
