import reducer from '../box';
import { CREATE_BOX } from '../../constants/ActionTypes';

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
