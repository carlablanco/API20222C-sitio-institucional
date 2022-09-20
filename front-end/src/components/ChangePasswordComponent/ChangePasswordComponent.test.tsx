import React from 'react';
import ReactDOM from 'react-dom';
import ChangePasswordComponent from './ChangePasswordComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangePasswordComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});