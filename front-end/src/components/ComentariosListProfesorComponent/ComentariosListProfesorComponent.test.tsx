import React from 'react';
import ReactDOM from 'react-dom';
import ComentariosListProfesorComponent from './ComentariosListProfesorComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComentariosListProfesorComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});