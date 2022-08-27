import React from 'react';
import ReactDOM from 'react-dom';
import SignupComponent from './SignupComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignupComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});