import React from 'react';
import ReactDOM from 'react-dom';
import ModalCancelarComponent from './ModalCancelarComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalCancelarComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});