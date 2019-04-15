import { UPDATE_BOX } from '../constants/actionTypes';
import { put, select } from 'redux-saga/effects';
import { getBoxes, getGameContext } from './selectors';
import { opposingCorners, sides, winningCombinations } from './constants';

export function* calculateNextMove() {
  const boxes = yield select(getBoxes);

  const gameContext = yield select(getGameContext);

  let nextMove = yield twoInARow(boxes, gameContext.computersTeam);

  if (!nextMove) {
    nextMove = yield twoInARow(boxes, gameContext.usersTeam);
  }

  if (!nextMove) {
    nextMove = yield center(boxes);
  }

  if (!nextMove) {
    nextMove = yield oppositeCorner(boxes, gameContext.usersTeam);
  }

  if (!nextMove) {
    nextMove = yield emptyCorner(boxes, gameContext.usersTeam);
  }

  if (!nextMove) {
    nextMove = yield emptySide(boxes);
  }

  if (!nextMove) {
    nextMove = yield lastTurn(boxes);
  }

  if (nextMove) {
    yield put({
      type: UPDATE_BOX,
      id: nextMove - 1,
      value: gameContext.computersTeam
    });
  }
}

export function* threeInARow(boxes, playerSymbol) {
  let playersBoxes = yield currentPlayersBoxes(boxes, playerSymbol);

  for (const wc of winningCombinations) {
    if (
      playersBoxes.includes(wc[0]) &&
      playersBoxes.includes(wc[1]) &&
      playersBoxes.includes(wc[2])
    ) {
      return {
        winner: playerSymbol,
        winningCombination: [wc[0], wc[1], wc[2]]
      };
    }
  }
}

function center(boxes, playerSymbol) {
  const centerPosition = 5;

  if (boxes[centerPosition - 1].value === null) {
    return centerPosition;
  }
}

function oppositeCorner(boxes, playerSymbol) {
  for (const corner of Object.keys(opposingCorners)) {
    if (boxes[corner - 1].value === playerSymbol) {
      if (boxes[opposingCorners[corner] - 1].value === null) {
        return opposingCorners[corner];
      }
    }
  }
}

function emptyCorner(boxes, playerSymbol) {
  for (const corner of Object.keys(opposingCorners)) {
    if (boxes[corner - 1].value === null) {
      return corner;
    }
  }
}

function* emptySide(boxes) {
  let emptyBoxes = yield currentPlayersBoxes(boxes, null);

  for (const side of sides) {
    if (
      emptyBoxes.includes(side[0]) &&
      emptyBoxes.includes(side[1]) &&
      emptyBoxes.includes(side[2])
    ) {
      return side[0];
    }
  }
}

export function currentPlayersBoxes(boxes, playerSymbol) {
  let playersBoxes = [];

  for (const box in boxes) {
    if (boxes[box].value === playerSymbol) {
      playersBoxes.push(Number(box) + 1);
    }
  }

  return playersBoxes;
}

function* lastTurn(boxes, playerSymbol) {
  let playersBoxes = yield currentPlayersBoxes(boxes, null);

  return playersBoxes[0];
}

function* twoInARow(boxes, playerSymbol) {
  let nextCell;

  let playersBoxes = yield currentPlayersBoxes(boxes, playerSymbol);

  for (const wc of winningCombinations) {
    if (playersBoxes.includes(wc[0]) && playersBoxes.includes(wc[1])) {
      if (boxes[wc[2] - 1].value === null) {
        nextCell = wc[2];
        break;
      }
    }
    if (playersBoxes.includes(wc[1]) && playersBoxes.includes(wc[2])) {
      if (boxes[wc[0] - 1].value === null) {
        nextCell = wc[0];
        break;
      }
    }
    if (playersBoxes.includes(wc[0]) && playersBoxes.includes(wc[2])) {
      if (boxes[wc[1] - 1].value === null) {
        nextCell = wc[1];
        break;
      }
    }
  }

  return nextCell;
}
