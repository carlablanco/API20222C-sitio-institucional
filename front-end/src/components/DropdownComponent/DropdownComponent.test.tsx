import React from 'react';
import ReactDOM from 'react-dom';
import DropdownComponent from './DropdownComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DropdownComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});