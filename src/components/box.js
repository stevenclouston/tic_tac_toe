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
            if (this.props.box && this.props.box.value === this.props.gameContext.computersTeam){
                return 1500
            } else {
                return 200
            }
        }

        const boxStatus = () => {
            if (this.props.winningCombination) {
                if (this.props.box && this.props.winningCombination.includes(this.props.id + 1)){
                    return "winner"
                } else {
                    return "looser"
                }
            }
        }

        const boxClass = () => {
            if (this.props.draw){
                return "loosingBox"
            }
            if (boxStatus() === "winner") {
                return "winningBox"
            }

            if (boxStatus() === "looser") {
                return "loosingBox"
            }

            return "box"
        }

        const oTextClass = () => {
            if (this.props.draw || this.props.winningCombination){
                return "oTeamResult"
            }

            return "oTeam"
        }

        return (
            <div
                className={boxClass()}
                onClick={this.onClick}
            >
                <Fade  {...{timeout: {enter: fadeTime(), exit: 1000} }}
                       in={box && box.value ? true : false}
                       mountOnEnter
                       unmountOnExit
                >
                    <div className={(box && box.value === teams.X) ? "xTeam" : oTextClass()}>
                        {box ? box.value : null}
                    </div>
                </Fade>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
