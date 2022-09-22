import React from 'react';
import ReactDOM from 'react-dom';
import ClassesComponent from './ClassesComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClassesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});