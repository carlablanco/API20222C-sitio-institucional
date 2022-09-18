import React from 'react';
import ReactDOM from 'react-dom';
import SolicitudesComponent from './SolicitudesComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SolicitudesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});