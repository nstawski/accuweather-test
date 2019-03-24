import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class City extends Component {
  constructor(props) {
    super(props);
    const { city, unit } = this.props;
    this.state = {
      city,
      unit
    };
  }

  shouldComponentUpdate(nextProps) {
    const { city, unit } = this.state;
    return nextProps.city !== city || nextProps.unit !== unit;
  }

  componentDidUpdate(prevProps) {
    const { city, unit } = this.props;
    if (prevProps.city !== city) {
      this.updateCity(city);
    }
    if (prevProps.unit !== unit) {
      this.updateUnit(unit);
    }
  }

  updateCity = city => {
    this.setState({
      city
    });
  };

  updateUnit = unit => {
    this.setState({
      unit
    });
  };

  render() {
    const { city, unit } = this.state;
    const { handleDelete } = this.props;
    return (
      <div className="City">
        <div className="City--name">
          {city && Object.keys(city).indexOf('name') !== 'undefined' ? city.name : 'Loading...'}
          {city && Object.keys(city).indexOf('state') !== 'undefined' ? `, ${city.state}` : ''}
        </div>
        <div className="City--temperature">
          {city && Object.keys(city).indexOf('temperature') !== 'undefined'
            ? city.temperature[unit].Value
            : ''}
          {city && Object.keys(city).indexOf('temperature') !== 'undefined'
            ? city.temperature[unit].Unit
            : ''}
        </div>
        <div className="City--icon">
          {city && Object.keys(city).indexOf('icon') !== 'undefined' ? (
            <img
              alt={city.text}
              src={`https://developer.accuweather.com/sites/default/files/${
                city.icon && city.icon.toString().length === 2 ? city.icon : `0${city.icon}`
              }-s.png`}
            />
          ) : (
            ''
          )}
        </div>
        <div
          role="button"
          tabIndex={0}
          className="City--delete"
          onClick={() => handleDelete(city.key)}
          onKeyPress={() => handleDelete(city.key)}
        >
          <div className="Delete--button">x</div>
        </div>
      </div>
    );
  }
}

City.propTypes = {
  city: PropTypes.shape({}).isRequired,
  unit: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default City;
