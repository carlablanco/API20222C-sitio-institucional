import React from 'react';
import ReactDOM from 'react-dom';
import FormComponent from './FormComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});