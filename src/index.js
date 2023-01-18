import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './Components/Board';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Board noPlayers="4">
      
    </Board>
  </React.StrictMode>
);
