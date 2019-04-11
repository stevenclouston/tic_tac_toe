import React, { Component } from 'react';
import './assets/css/App.css';
import Board from "./components/board";
import Title from "./components/title";
import StartPage from "./components/startPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-body">
            <Title/>
            <StartPage/>
            <Board />
        </header>
      </div>
    );
  }
}

export default App;
