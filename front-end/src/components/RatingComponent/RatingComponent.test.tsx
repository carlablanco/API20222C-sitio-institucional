import React from 'react';
import ReactDOM from 'react-dom';
import RatingComponent from './RatingComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RatingComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});