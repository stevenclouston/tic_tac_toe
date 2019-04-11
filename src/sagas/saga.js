import { all, takeEvery, put, select } from 'redux-saga/effects'
import {UPDATE_BOX, UPDATE_CURRENT_TURN, UPDATE_USERS_TEAM} from "../constants/actionTypes";
import {players} from "../constants/players";
import {getBoxes, getGameContext} from "./selectors";

function* randomCurrentTurn() {

    if (Math.random() > 0.5) {
        return players.COMPUTER
    } else {
        return players.USER
    }
}

export function* updateBoxAsync(action) {

    let gameContext = yield select(getGameContext)

    if (gameContext.winner || gameContext.draw) {
        return
    }

    if ( yield boxAlreadyAllocated(action)){
        return
    }

    yield put({type: UPDATE_BOX, id: action.id, value: action.value})

    // yield put({type: UPDATE_CURRENT_TURN, currentTurn: players.COMPUTER})
    //
    // gameContext = yield select(getGameContext)
    //
    // if (gameContext.currentTurn === players.COMPUTER){
    //
    //     const nextPosition = yield calculateNextMove()
    //
    //     const winner = yield findWinner()
    //
    //     if (winner){
    //
    //         yield delay(600)
    //         yield put({type: UPDATE_GAME_RESULT, gameResult: winner})
    //
    //         return
    //     }
    //
    //     const draw = yield CheckDraw()
    //
    //     if (draw){
    //         yield delay(600)
    //         yield put({type: UPDATE_GAME_RESULT, gameResult: draw})
    //
    //         return
    //     }
    //
    //     return
    // }
    //
    // yield put({type: UPDATE_CURRENT_TURN, currentTurn: players.USER})
}

export function* updateUsersTeamAsync(action) {

    const { team } = action

    yield put({type: UPDATE_USERS_TEAM, team: team})

    const currentTurn = yield randomCurrentTurn()

    yield put({type: UPDATE_CURRENT_TURN, currentTurn: currentTurn})

}

function* boxAlreadyAllocated(action) {

    const boxes = yield select(getBoxes)

    if (boxes[action.id].value){
        return true
    }

    return false

}

export function* watchUpdateUsersTeamAsync() {

    yield takeEvery('UPDATE_USERS_TEAM_ASYNC', updateUsersTeamAsync)
}

export function* watchUpdateBoxAsync() {

    yield takeEvery('UPDATE_BOX_ASYNC', updateBoxAsync)
}

export default function* rootSaga() {
    yield all([
        watchUpdateUsersTeamAsync(),
        watchUpdateBoxAsync()
    ])
}