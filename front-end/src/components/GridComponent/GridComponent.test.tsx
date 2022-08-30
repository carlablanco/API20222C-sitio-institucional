import React from 'react';
import ReactDOM from 'react-dom';
import GridComponent from './GridComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GridComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});