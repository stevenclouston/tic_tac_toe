import React, {Component} from 'react';
import '../assets/css/board.css';
import '../assets/css/box.css';
import connect from "react-redux/es/connect/connect";
import Fade from "@material-ui/core/Fade";
import {CREATE_BOARD, CREATE_BOX, UPDATE_BOX_ASYNC} from "../constants/actionTypes";
import {teams} from "../constants/teams";
import BoxSelector from "../state_selectors/box";

const mapStateToProps = (state, ownProps) => ({
    box: BoxSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
    createBox: (id) => {
        dispatch({type: CREATE_BOX, id})
    },
});

class Box extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this)

    }

    componentDidMount() {
        const { id } = this.props

        debugger
        this.props.createBox(id)
    }


    onClick() {

    }

    render() {
        const {box} = this.props

        const fadeTime = () => {
            return 1500
        }

        return (
            <div
                className={"box"}
                onClick={this.onClick}
            >
                <Fade  {...{timeout: {enter: fadeTime(), exit: 1000} }}
                       in={true}
                       mountOnEnter
                       unmountOnExit
                >
                    <div className={(box && box.value === teams.X) ? "xText" : "oText"}>
                        {box ? box.value : null}
                    </div>
                </Fade>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
