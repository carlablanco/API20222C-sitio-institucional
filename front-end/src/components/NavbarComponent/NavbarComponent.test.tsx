import React from 'react';
import ReactDOM from 'react-dom';
import NavbarComponent from './NavbarComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavbarComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});