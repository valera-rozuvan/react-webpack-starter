import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

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
        <Switch>
          <Route exact path="/"><div /></Route>
          <Route exact path="/a"><PageA /></Route>
          <Route exact path="/b"><PageB /></Route>
          <Route exact path="/c"><PageC /></Route>
          <Route path="*"><NoMatch /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
