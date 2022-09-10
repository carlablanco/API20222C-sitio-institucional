import React from 'react';
import ReactDOM from 'react-dom';
import ProfesorInfoComponent from './ProfesorInfoComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfesorInfoComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});