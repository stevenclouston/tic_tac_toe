import React, { Component } from 'react';
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import Fade from "@material-ui/core/Fade";

class GameStatus extends Component {

    render() {
        const status = () => {
            if (this.props.draw) {
                return "It's a draw!"
            }
            if (this.props.winner === this.props.gameContext.usersTeam){
                return "You won!"
            } else {
                return "Better luck next time!"
            }

        }

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
                        <h4>
                            {status()}
                        </h4>
                    </div>
                </div>
            </Fade>
        )

        return (
            message
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    gameContext: state.gameContext,
    winner: state.gameContext.winner,
    draw: state.gameContext.draw,
});

export default connect(mapStateToProps, null)(GameStatus);
