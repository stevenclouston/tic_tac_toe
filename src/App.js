import React, { Component } from 'react';
import './assets/css/App.css';
import './assets/css/status.css';
import Board from './components/board';
import Title from './components/title';
import StartPage from './components/startPage';
import GameStatus from './components/gameStatus';
import ResetGame from './components/resetGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-body">
          <div className="status">
            <GameStatus />
          </div>
          <Title />
          <StartPage />
          <Board />
          <div className="tryAgain">
            <ResetGame />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
