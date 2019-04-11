import { all, takeEvery, put } from 'redux-saga/effects'
import {UPDATE_CURRENT_TURN, UPDATE_USERS_TEAM} from "../constants/actionTypes";
import {players} from "../constants/players";

export function* watchUpdateUsersTeamAsync() {

    yield takeEvery('UPDATE_USERS_TEAM_ASYNC', updateUsersTeamAsync)
}

export default function* rootSaga() {
    yield all([
        watchUpdateUsersTeamAsync()
    ])
}
function* randomCurrentTurn() {

    if (Math.random() > 0.5) {
        return players.COMPUTER
    } else {
        return players.USER
    }
}

export function* updateUsersTeamAsync(action) {

    const { team } = action

    yield put({type: UPDATE_USERS_TEAM, team: team})

    const currentTurn = yield randomCurrentTurn()

    yield put({type: UPDATE_CURRENT_TURN, currentTurn: currentTurn})

}