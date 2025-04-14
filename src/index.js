import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // <--- importante: asegúrate que este archivo existe y tiene `export default App`
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
