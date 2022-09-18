import React from 'react';
import ReactDOM from 'react-dom';
import ResetPasswordComponent from './ResetPasswordComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResetPasswordComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});