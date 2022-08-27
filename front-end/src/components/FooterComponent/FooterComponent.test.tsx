import React from 'react';
import ReactDOM from 'react-dom';
import FooterComponent from './FooterComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FooterComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});