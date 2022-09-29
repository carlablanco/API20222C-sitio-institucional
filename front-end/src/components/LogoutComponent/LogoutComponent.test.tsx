import React from 'react';
import ReactDOM from 'react-dom';
import LogoutComponent from './LogoutComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LogoutComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});