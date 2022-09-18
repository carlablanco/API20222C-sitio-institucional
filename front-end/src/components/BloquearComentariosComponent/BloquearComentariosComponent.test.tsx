import React from 'react';
import ReactDOM from 'react-dom';
import BloquearComentariosComponent from './BloquearComentariosComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BloquearComentariosComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});