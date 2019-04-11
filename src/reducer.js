import board from "./reducers/board";
import box from "./reducers/box";
import { combineReducers } from "redux";

const appReducer = combineReducers({
    board,
    box
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_GAME') {
        state = undefined;
    }

    return appReducer(state, action);
}

export default (rootReducer)
