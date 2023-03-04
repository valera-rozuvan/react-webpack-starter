import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import NoMatch from './components/NoMatch';

import './styles.css';

function App() {
  return (
    <Switch>
      <Route path="/*"><Home /></Route>
      <Route path="*"><NoMatch /></Route>
    </Switch>
  );
}

export default App;
