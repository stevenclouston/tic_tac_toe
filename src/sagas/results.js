import { getBoxes, getGameContext } from './selectors';
import { select } from 'redux-saga/effects';
import { currentPlayersBoxes, threeInARow } from './calculateNextTurnSaga';

export function* findWinner() {
  let boxes = yield select(getBoxes);

  const gameContext = yield select(getGameContext);

  let winner = yield threeInARow(boxes, gameContext.usersTeam);

  if (!winner) {
    winner = yield threeInARow(boxes, gameContext.computersTeam);
  }

  return winner;
}

export function* CheckDraw() {
  const boxes = yield select(getBoxes);

  let playersBoxes = yield currentPlayersBoxes(boxes, null);

  if (playersBoxes.length === 0) {
    return {
      draw: true
    };
  }
}
