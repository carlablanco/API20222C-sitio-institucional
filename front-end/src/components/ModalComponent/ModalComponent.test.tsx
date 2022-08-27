import React from 'react';
import ReactDOM from 'react-dom';
import ModalComponent from './ModalComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});