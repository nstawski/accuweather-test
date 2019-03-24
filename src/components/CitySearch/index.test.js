import React from 'react';
import ReactDOM from 'react-dom';
import CitySearch from '.';

it('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CitySearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
