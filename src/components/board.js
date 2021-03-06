import React, { Component } from 'react';
import '../assets/css/board.css';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import Box from './box';

export class Board extends Component {
  render() {
    const { board, gameContext } = this.props;

    const boxes = board.map((box, index) => <Box id={index} key={index} />);

    const boardLayout = (
      <Fade
        {...{ timeout: { enter: 1000, exit: 0 } }}
        in={gameContext.usersTeam ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <div className="board">
          <div className="container">{boxes}</div>
        </div>
      </Fade>
    );

    return boardLayout;
  }
}

const mapStateToProps = state => ({
  board: state.board,
  gameContext: state.gameContext
});

export default connect(
  mapStateToProps,
  null
)(Board);
