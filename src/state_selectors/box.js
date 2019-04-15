const BoxSelector = (state, ownProps) => {
  if (state.box) {
    return state.box[ownProps.id];
  }
};

export default BoxSelector;
