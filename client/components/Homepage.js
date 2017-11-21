import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { newRoom, getRooms } from '../store/whiteboard'


export class Homepage extends Component {

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllRooms(this.props.user)
    }

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.user !== nextProps.user) {
      this.props.getAllRooms(nextProps.user)
    }
  }

  render() {
    return (
      <div>
        <h3>Time to put your thinking cap on!</h3>

        <button onClick={() => this.props.createRoom(this.props.user)}>New Session</button>

        <h5>You've hosted</h5>
        {
          this.props.allRooms.filter(room => {
            return room.host === this.props.user.name
          })
            .map(result => {
              return (<div key={result.id}>
                <NavLink to={`/whiteboards/${result.id}`}>{result.host}</NavLink>
              </div>
              )
            })
        }
        <h5>You've attended</h5>
        {
          this.props.allRooms.filter(room => {
            return room.host !== this.props.user.name
          })
            .map(result => {
              return (<div key={result.id}>
                <NavLink to={`/whiteboards/${result.id}`}>{result.host}</NavLink>
              </div>
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
