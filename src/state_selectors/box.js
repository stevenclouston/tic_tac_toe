const BoxSelector = (state, ownProps) => {
    debugger
    if (state.box) {
        return state.box[ownProps.id]
    }
}

export default BoxSelector