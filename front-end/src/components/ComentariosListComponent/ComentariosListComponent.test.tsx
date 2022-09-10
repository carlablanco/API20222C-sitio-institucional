import React from 'react';
import ReactDOM from 'react-dom';
import ComentariosListComponent from './ComentariosListComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComentariosListComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});