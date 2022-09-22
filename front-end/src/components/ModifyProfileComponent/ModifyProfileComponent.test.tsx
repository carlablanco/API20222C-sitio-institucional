import React from 'react';
import ReactDOM from 'react-dom';
import ModifyProfileComponent from './ModifyProfileComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModifyProfileComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});