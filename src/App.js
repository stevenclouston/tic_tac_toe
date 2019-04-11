import React, { Component } from 'react';
import './assets/css/App.css';
import Board from "./components/board";
import Title from "./components/title";
import StartPage from "./components/startPage";
import GameStatus from "./components/gameStatus";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-body">
            <div className="status">
                <GameStatus/>
            </div>
            <Title/>
            <StartPage/>
            <Board/>
        </header>
      </div>
    );
  }
}

export default App;
