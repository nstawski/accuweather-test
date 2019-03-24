import React from 'react';
import ReactDOM from 'react-dom';
import City from '.';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders', () => {
  const city = { temperature: { Imperial: { Value: 12, Unit: 'F' } } };
  const div = document.createElement('div');
  ReactDOM.render(<City city={city} unit="Imperial" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
