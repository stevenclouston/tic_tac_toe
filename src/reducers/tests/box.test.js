import reducer from '../box';
import { CREATE_BOX, UPDATE_BOX } from '../../constants/ActionTypes';

describe('actions', () => {
  it('should create a box', () => {
    const action = {
      type: CREATE_BOX,
      id: 1
    };
    const expectedAction = {
      1: {
        value: null
      }
    };
    expect(reducer({}, action)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  let state = {};

  beforeEach(() => {
    state = {
      1: {
        value: null
      }
    };
  });

  it('should update a box object when passed an id and new value', () => {
    const action = {
      type: UPDATE_BOX,
      id: 1,
      value: 'X'
    };
    const expectedAction = {
      1: {
        value: 'X'
      }
    };
    expect(reducer(state, action)).toEqual(expectedAction);
  });
});
