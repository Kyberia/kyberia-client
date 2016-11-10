import React from 'react';
import ReactDOM from 'react-dom';
import MemoryRouter from 'react-router/MemoryRouter';
import { App } from './App';

const noop = () => ({});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App login={noop} logout={noop}/>
    </MemoryRouter>
    , div);
});
