import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { newRoom } from '../store/whiteboard'


export class Homepage extends Component {
  render() {
    return (
      <div>
        <h4>Time to put your thinking cap on! Create or return to a session.</h4>
        <button onClick={event => this.props.createRoom(this.props.user)}>New Session</button>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRoom: function (user) {
      dispatch(newRoom(user))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(Homepage))
