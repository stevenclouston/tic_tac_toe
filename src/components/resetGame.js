import React, { Component } from 'react';
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import {teams} from "../constants/teams";
import {RESET_GAME} from "../constants/actionTypes";

const mapStateToProps = (state, ownProps) => ({
    gameContext: state.gameContext,
    winner: state.gameContext.winner,
    draw: state.gameContext.draw
});

const mapDispatchToProps = dispatch => ({
    resetGame: () => {
        dispatch({type: RESET_GAME})
    }
});

class ResetGame extends Component {
    constructor() {
        super();
        this.resetButtonClick = this.resetButtonClick.bind(this)
    }

    resetButtonClick() {
        this.props.resetGame()
    }

    render() {

        const showDisplay = () => {
            if (this.props.winner || this.props.draw) {
                return true
            }

            return false
        }

        const message = (
            <Fade  {...{timeout: {enter: 1000, exit: 0} }} in={showDisplay()} mountOnEnter unmountOnExit>
                <div style={{position: "relative"}}>
                    <div style={{position: "relative", width:"100%"}}>
                        <Button variant="outlined" component="span" className={"teamText"} onClick={this.resetButtonClick} style={{margin: 30}}>
                            Play Again
                        </Button>

                    </div>
                </div>
            </Fade>
        )

        return (
            message
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetGame);