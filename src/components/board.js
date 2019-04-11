import React, { Component } from 'react';
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import {players} from "../constants/players";
import {teams} from "../constants/teams";
import Fade from "@material-ui/core/Fade";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class Board extends Component {
    constructor() {
        super();

    }

    render() {

        const board = (
            <Fade  {...{timeout: {enter: 1000, exit: 0} }}
                   in={true}
                   mountOnEnter
                   unmountOnExit
            >
                <div className="board">
                    <div className="container">

                    </div>
                </div>
            </Fade>
        )

        return (
            board
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
