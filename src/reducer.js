import board from "./reducers/board";
import box from "./reducers/box";
import { combineReducers } from "redux";
import gameContext from "./reducers/gameContext";

const appReducer = combineReducers({
    board,
    box,
    gameContext
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_GAME') {
        state = undefined;
    }

    return appReducer(state, action);
}

export default (rootReducer)
