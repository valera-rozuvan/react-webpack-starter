import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import NoMatch from './components/NoMatch';

import './styles.css';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
