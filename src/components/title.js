import React, { Component } from "react";
import "../assets/css/board.css";
import { connect } from "react-redux";
import Fade from "@material-ui/core/Fade";

class Title extends Component {
  render() {
    const { gameContext } = this.props;

    const title = (
      <Fade
        {...{ timeout: { enter: 100, exit: 0 } }}
        in={!gameContext.usersTeam}
        mountOnEnter
        unmountOnExit
      >
        <h1>Tic Tac Toe</h1>
      </Fade>
    );

    return title;
  }
}

const mapStateToProps = (state, ownProps) => ({
  gameContext: state.gameContext
});

export default connect(
  mapStateToProps,
  null
)(Title);
