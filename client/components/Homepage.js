import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { newRoom, getRooms } from '../store/whiteboard'



export class Homepage extends Component {

  componentDidMount() {
    console.log("USER---", this.props.user)
    this.props.getAllRooms(this.props.user);
  }

  render() {
    return (
      <div>
        <h4>Time to put your thinking cap on!</h4>
        <h5>Create a new session</h5>
        <button onClick={() => this.props.createRoom(this.props.user)}>New Session</button>
        <h5>Return to a session</h5>
        {
          this.props.allRooms.map(room => {
            return (
              <li key={room.id}>
                <NavLink to={`/whiteboards/${room.id}`}>
                  {room.host}
                </NavLink>
              </li>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    allRooms: state.whiteboard
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRoom: function (user) {
      dispatch(newRoom(user))
    },
    getAllRooms: function (user) {
      dispatch(getRooms(user))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(Homepage))
