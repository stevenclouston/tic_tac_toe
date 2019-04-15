import { CREATE_BOX, UPDATE_BOX } from '../constants/actionTypes';

const initialState = {};

const updateBox = (state, action) => {
  const { id, value } = action;

  return {
    ...state,
    [id]: { ...state[id], value }
  };
};

const createBox = (state, action) => {
  const { id } = action;

  const newBox = {
    value: null
  };

  return {
    ...state,
    [id]: newBox
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOX:
      return updateBox(state, action);
    case CREATE_BOX:
      return createBox(state, action);

    default:
      return state;
  }
};
