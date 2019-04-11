import React, { Component } from 'react';
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import {players} from "../constants/players";
import {teams} from "../constants/teams";
import Fade from "@material-ui/core/Fade";
import Box from "./box"

const mapStateToProps = state => ({
    board: state.board,
    gameContext: state.gameContext
});


const mapDispatchToProps = dispatch => ({

});

class Board extends Component {
    render() {
        const { board } = this.props

        const boxes = board.map((box, index)  =>
            <Box id={index} />
        )

        const boardLayout = (
            <Fade  {...{timeout: {enter: 1000, exit: 0} }}
                   in={this.props.gameContext.usersTeam ? true : false}
                   mountOnEnter
                   unmountOnExit
            >
                <div className="board">
                    <div className="container">
                        {boxes}
                    </div>
                </div>
            </Fade>
        )

        return (
            boardLayout
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
