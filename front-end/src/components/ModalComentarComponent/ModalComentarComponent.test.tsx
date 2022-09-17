import React from 'react';
import ReactDOM from 'react-dom';
import ModalComentarComponent from './ModalComentarComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalComentarComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});