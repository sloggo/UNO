import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './Components/Board';
import Menu from './Components/Menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu></Menu>
  </React.StrictMode>
);
