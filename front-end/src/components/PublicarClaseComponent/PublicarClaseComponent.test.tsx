import React from 'react';
import ReactDOM from 'react-dom';
import PublicarClaseComponent from './PublicarClaseComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PublicarClaseComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});