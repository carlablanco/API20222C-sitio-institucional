import React from 'react';
import ReactDOM from 'react-dom';
import PublishClassComponent from './PublishClassComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PublishClassComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});