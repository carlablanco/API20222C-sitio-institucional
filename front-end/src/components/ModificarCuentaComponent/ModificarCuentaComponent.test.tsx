import React from 'react';
import ReactDOM from 'react-dom';
import ModificarCuentaComponent from './ModificarCuentaComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModificarCuentaComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});