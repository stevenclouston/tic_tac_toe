import { combineReducers } from "redux";

const appReducer = combineReducers({
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_GAME') {
        state = undefined;
    }

    return appReducer(state, action);
}

export default (rootReducer)
