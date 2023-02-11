import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import PageA from '../PageA';
import PageB from '../PageB';
import PageC from '../PageC';
import NoMatch from '../NoMatch';

import './style.scss';

function Home() {
  return (
    <div className="App">
      <div className="Header">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/a">Page A</Link></li>
          <li><Link to="/b">Page B</Link></li>
          <li><Link to="/c">Page C</Link></li>
        </ul>
      </div>
      <div className="Body">
        <Routes>
          <Route path="" element={<div />} />
          <Route path="a" element={<PageA />} />
          <Route path="b" element={<PageB />} />
          <Route path="c" element={<PageC />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
