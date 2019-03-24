import React, { Component } from 'react';
import PropTypes from 'prop-types';
import text from '../../text.json';
import './index.scss';

class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
  }

  onPressEnter(event) {
    const { city } = this.state;
    const { handleClick } = this.props;
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleClick(city);
    }
  }

  handleClick() {
    const { city } = this.state;
    const { handleClick } = this.props;
    handleClick(city);
  }

  handleChange(event) {
    this.setState({
      city: event.target.value
    });
  }

  render() {
    const { city } = this.state;
    const { error } = this.props;
    return (
      <div className="CitySearch">
        <div className="CitySearch--block">
          <input
            type="text"
            className="CitySearch--input"
            value={city}
            onChange={this.handleChange}
            onKeyDown={this.onPressEnter}
          />
          <button type="button" className="CitySearch--button" onClick={this.handleClick}>
            {text.searchAndAdd}
          </button>
        </div>
        <div className="CitySearch--error">{error}</div>
      </div>
    );
  }
}

CitySearch.propTypes = {
  error: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CitySearch;
