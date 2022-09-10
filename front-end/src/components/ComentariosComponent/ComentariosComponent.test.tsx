import React from 'react';
import ReactDOM from 'react-dom';
import ComentariosComponent from './ComentariosComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComentariosComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});