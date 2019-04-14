import React, { Component } from "react";
import "../assets/css/board.css";
import "../assets/css/box.css";
import "../assets/css/teams.css";
import { connect } from "react-redux";
import Fade from "@material-ui/core/Fade";
import {
  CREATE_BOARD,
  CREATE_BOX,
  UPDATE_BOX_ASYNC
} from "../constants/actionTypes";
import { teams } from "../constants/teams";
import BoxSelector from "../state_selectors/box";

class Box extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.createBox(id);
  }

  onClick = () => {
    const { id, gameContext } = this.props;

    this.props.updateBox(id, gameContext.usersTeam);
  };

  render() {
    const { box, gameContext } = this.props;

    const fadeTime = () => {
      if (box && box.value === gameContext.computersTeam) {
        return 1500;
      } else {
        return 200;
      }
    };

    const boxStatus = () => {
      const { winningCombination, id, box } = this.props;

      if (winningCombination) {
        if (box && winningCombination.includes(id + 1)) {
          return "winner";
        }

        return "looser";
      }
    };

    const boxClass = () => {
      const { draw } = this.props;

      if (draw) {
        return "loosingBox";
      }
      if (boxStatus() === "winner") {
        return "winningBox";
      }

      if (boxStatus() === "looser") {
        return "loosingBox";
      }

      return "box";
    };

    const oTextClass = () => {
      const { draw, winningCombination } = this.props;

      if (draw || winningCombination) {
        return "oTeamResult";
      }

      return "oTeam";
    };

    return (
      <div className={boxClass()} onClick={this.onClick}>
        <Fade
          {...{ timeout: { enter: fadeTime(), exit: 1000 } }}
          in={box && box.value}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={box && box.value === teams.X ? "xTeam" : oTextClass()}
          >
            {box ? box.value : null}
          </div>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  box: BoxSelector(state, ownProps),
  gameContext: state.gameContext,
  winningCombination: state.gameContext.winningCombination,
  draw: state.gameContext.draw
});

const mapDispatchToProps = dispatch => ({
  updateBox: (id, value) => {
    dispatch({ type: UPDATE_BOX_ASYNC, id, value });
  },
  createBox: id => {
    dispatch({ type: CREATE_BOX, id });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
