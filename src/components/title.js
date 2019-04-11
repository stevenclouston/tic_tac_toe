import React, { Component } from 'react';
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import Fade from "@material-ui/core/Fade";

const mapStateToProps = (state, ownProps) => ({
    gameContext: state.gameContext
});

class Title extends Component {
    constructor() {
        super();
    }

    render() {
        const title = (
            <Fade  {...{timeout: {enter: 100, exit: 0} }} in={!this.props.gameContext.usersTeam ? true : false} mountOnEnter unmountOnExit>
                <h1>
                    Tic Tac Toe
                </h1>
            </Fade>
        )

        return (
            title
        )
    }
}

export default connect(mapStateToProps, null)(Title);
