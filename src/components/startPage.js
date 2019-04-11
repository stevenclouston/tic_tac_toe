import React, {Component} from "react";
import '../assets/css/board.css';
import connect from "react-redux/es/connect/connect";
import Box from "./box"
import {players} from "../constants/players";
import {teams} from "../constants/teams";
import {UPDATE_USERS_TEAM_ASYNC} from "../constants/actionTypes";
import Button from "@material-ui/core/Button";
import Fade from '@material-ui/core/Fade';

const mapStateToProps = state => ({
    board: state.board,
    gameContext: state.gameContext
});


const mapDispatchToProps = dispatch => ({
    updateUsersTeam: (team) => {
        dispatch({type: UPDATE_USERS_TEAM_ASYNC, team})
    }
});

class StartPage extends Component {
    constructor() {
        super();

        this.selectXButtonClick = this.selectXButtonClick.bind(this)
        this.selectOButtonClick = this.selectOButtonClick.bind(this)
    }

    selectXButtonClick() {
        this.props.updateUsersTeam(teams.X)
    }

    selectOButtonClick() {
        this.props.updateUsersTeam(teams.O)
    }


    render() {

        const buttons = (
            <Fade  {...{timeout: {enter: 2500, exit: 1000} }} in={true} mountOnEnter unmountOnExit>
                <div className="container">
                    <Button variant="outlined" component="span" className={"teamText"} onClick={this.selectXButtonClick} style={{margin: 10}}>
                        Team X
                    </Button>
                    <Button variant="outlined" component="span" className={"teamText"} onClick={this.selectOButtonClick} style={{margin: 10}}>
                        Team O
                    </Button>
                </div>
            </Fade>
        )

        if (!this.props.gameContext.usersTeam) {
            return (
                buttons
            )
        } else{
            return (
                null
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);