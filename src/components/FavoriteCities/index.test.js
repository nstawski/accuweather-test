import React from 'react';
import ReactDOM from 'react-dom';
import FavoriteCities from '.';

it('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteCities />, div);
  ReactDOM.unmountComponentAtNode(div);
});
