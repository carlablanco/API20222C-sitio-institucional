import React from 'react';
import ReactDOM from 'react-dom';
import ClasesComponent from './ClasesComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClasesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});