import reducer from '../board';

describe('actions', () => {
  it('should initialise', () => {
    const action = {
      type: undefined
    };

    const expectedReturnData = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    expect(reducer(undefined, action)).toEqual(expectedReturnData);
  });
});
