import React, { Component } from 'react';
import PropTypes from 'prop-types';
import City from './City';
import text from '../../text.json';
import './index.scss';

class FavoriteCities extends Component {
  static unitSwitch = {
    Imperial: 'Metric',
    Metric: 'Imperial'
  };

  constructor(props) {
    super(props);
    this.state = {
      unit: 'Imperial'
    };
  }

  render() {
    const { cities, handleDelete } = this.props;
    const { unit } = this.state;
    return (
      <div className="FavoriteCities">
        <h1 className="FavoriteCities--header">
          {text.favoriteCities}
          {cities && cities.length ? (
            <div
              role="button"
              tabIndex={0}
              className="FavoriteCities--unitBlock"
              onClick={() =>
                this.setState({
                  unit: FavoriteCities.unitSwitch[unit]
                })
              }
              onKeyPress={() =>
                this.setState({
                  unit: FavoriteCities.unitSwitch[unit]
                })
              }
            >
              Unit:&nbsp;
              <div className="FavoriteCities--unit">{unit === 'Imperial' ? 'F' : 'C'}</div>
            </div>
          ) : (
            ''
          )}
        </h1>
        {cities && cities.length ? (
          <div>
            <div className="FavoriteCities--list">
              {cities.map((city, key) => (
                <City key={city.key} city={city} unit={unit} handleDelete={handleDelete} />
              ))}
            </div>
          </div>
        ) : (
          <div className="FavoriteCities--empty"> You haven&#39;t added a favorite city yet.</div>
        )}
      </div>
    );
  }
}

FavoriteCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default FavoriteCities;
