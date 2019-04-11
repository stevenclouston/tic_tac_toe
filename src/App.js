import React, { Component } from 'react';
import './assets/css/App.css';
import Board from "./components/board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-body">
          <Board />
        </header>
      </div>
    );
  }
}

export default App;
