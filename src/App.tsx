import React from 'react';
import Counter from './components/Counter';
import TextBox from './components/TextBox';
import './style.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <br />
        <Counter />
        <br />
        <TextBox />
        <br />
        <TextBox />
      </header>
    </div>
  );
}

export default App;
