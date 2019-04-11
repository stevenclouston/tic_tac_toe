import {UPDATE_CURRENT_TURN, UPDATE_USERS_TEAM, UPDATE_GAME_RESULT} from "../constants/actionTypes";
import {players} from "../constants/players";
import {teams} from "../constants/teams";

const initialGameContext= {
    currentTurn: null,
    winner: null,
    usersTeam: null,
    computersTeam: null,
    winningCombination: null,
    draw: null
}

const updateCurrentTurn = (state, action) => {

    const { currentTurn } = action

    return {
        ...state,
        currentTurn: currentTurn

    }
}

const updateUsersTeam = (state, action) => {
    const { team } = action

    if (team === teams.O){
        return {
            ...state,
            usersTeam: teams.O,
            computersTeam: teams.X
        }
    } else {
        return {
            ...state,
            usersTeam: teams.X,
            computersTeam: teams.O
        }
    }
}

const updateGameResult = (state, action) => {

    const { gameResult } = action

    const { winner, winningCombination, draw } = gameResult

    return {
        ...state,
        winner: winner,
        winningCombination: winningCombination,
        draw: draw
    }
}

export default (state = initialGameContext, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_TURN:
            return updateCurrentTurn(state, action)
        case UPDATE_GAME_RESULT:
            return updateGameResult(state, action)
        case UPDATE_USERS_TEAM:
            return updateUsersTeam(state, action)

        default: return state;
    }
};
