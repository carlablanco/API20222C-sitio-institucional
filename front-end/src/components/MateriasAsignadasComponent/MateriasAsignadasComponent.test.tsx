import React from 'react';
import ReactDOM from 'react-dom';
import MateriasAsignadasComponent from './MateriasAsignadasComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MateriasAsignadasComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});