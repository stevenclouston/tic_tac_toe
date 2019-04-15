import React, { Component } from 'react';
import '../assets/css/board.css';
import '../assets/css/box.css';
import '../assets/css/teams.css';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import {
  CREATE_BOARD,
  CREATE_BOX,
  UPDATE_BOX_ASYNC
} from '../constants/actionTypes';
import { teams } from '../constants/teams';
import BoxSelector from '../state_selectors/box';

class Box extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.createBox(id);
  }

  onClick = () => {
    const { id, gameContext } = this.props;

    this.props.updateBox(id, gameContext.usersTeam);
  };

  boxStatus = () => {
    const { winningCombination, id, box } = this.props;

    if (winningCombination) {
      if (box && winningCombination.includes(id + 1)) {
        return 'winner';
      }

      return 'loser';
    }
  };

  boxClass = () => {
    const { draw } = this.props;

    if (draw) {
      return 'losingBox';
    }
    if (this.boxStatus() === 'winner') {
      return 'winningBox';
    }

    if (this.boxStatus() === 'loser') {
      return 'losingBox';
    }

    return 'box';
  };

  oTextClass = () => {
    const { draw, winningCombination } = this.props;

    if (draw || winningCombination) {
      return 'oTeamResult';
    }

    return 'oTeam';
  };

  fadeTime = () => {
    const { box, gameContext } = this.props;

    if (box && box.value === gameContext.computersTeam) {
      return 1500;
    } else {
      return 200;
    }
  };

  render() {
    const { box } = this.props;

    return (
      <div className={this.boxClass()} onClick={this.onClick}>
        <Fade
          {...{ timeout: { enter: this.fadeTime(), exit: 1000 } }}
          in={box && box.value}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={
              box && box.value === teams.X ? 'xTeam' : this.oTextClass()
            }
          >
            {box && box.value}
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
