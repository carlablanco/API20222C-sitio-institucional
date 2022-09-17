import React from 'react';
import ReactDOM from 'react-dom';
import MateriasInscritasComponent from './MateriasInscritasComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MateriasInscritasComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});