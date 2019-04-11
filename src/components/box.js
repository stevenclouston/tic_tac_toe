import React, {Component} from 'react';
import '../assets/css/board.css';
import '../assets/css/box.css';
import '../assets/css/teams.css';
import connect from "react-redux/es/connect/connect";
import Fade from "@material-ui/core/Fade";
import {CREATE_BOARD, CREATE_BOX, UPDATE_BOX_ASYNC} from "../constants/actionTypes";
import {teams} from "../constants/teams";
import BoxSelector from "../state_selectors/box";

const mapStateToProps = (state, ownProps) => ({
    box: BoxSelector(state, ownProps),
    gameContext: state.gameContext,
    winningCombination: state.gameContext.winningCombination,
    draw: state.gameContext.draw
});

const mapDispatchToProps = dispatch => ({
    updateBox: (id, value) => {
        dispatch({type: UPDATE_BOX_ASYNC, id, value})
    },
    createBox: (id) => {
        dispatch({type: CREATE_BOX, id})
    },
});

class Box extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this)

    }

    componentDidMount() {
        const { id } = this.props
        this.props.createBox(id)
    }


    onClick() {
        this.props.updateBox(this.props.id, this.props.gameContext.usersTeam)
    }

    render() {
        const {box} = this.props

        const fadeTime = () => {
            return 1500
        }

        return (
            <div
                className={"box"}
                onClick={this.onClick}
            >
                <Fade  {...{timeout: {enter: fadeTime(), exit: 1000} }}
                       in={true}
                       mountOnEnter
                       unmountOnExit
                >
                    <div className={(box && box.value === teams.X) ? "xTeam" : "oTeam"}>
                        {box ? box.value : null}
                    </div>
                </Fade>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
