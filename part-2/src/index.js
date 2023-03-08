import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const notes = [
  {
    content: 'HTML is easy',
    id: '1',
    important: true,
  },
  {
    content: 'Browser can only execute JavaScript',
    id: '2',
    important: false,
  },
  {
    content: 'GET and POST are the most important HTTP protocol methods',
    id: '3',
    important: true,
  },
];

root.render(
  <React.StrictMode>
    <App notes={notes} />
  </React.StrictMode>
);
