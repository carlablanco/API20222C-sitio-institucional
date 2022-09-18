import React from 'react';
import ReactDOM from 'react-dom';
import SolicitarClaseComponent from './SolicitarClaseComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SolicitarClaseComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});