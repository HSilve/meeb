import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Chatbox } from './Chatbox'
import { Attendees } from './Attendees'
import { fetchRoom } from '../store/whiteboard'

export class Sidebar extends Component {
  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getWhiteboard(id)
  }

  render() {
    return (
      <div className="sidebar">
        <h5 href="#">
          <div>Attendees</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h5>
        <Attendees {...this.props} /> {/*TO DO*/}
        <Chatbox />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    whiteboard: state.whiteboard,
    users: state.whiteboard.users
  }
}

const mapDispatch = (dispatch) => ({
  getWhiteboard: (id) => {
    dispatch(fetchRoom(id))
  }
})

export default withRouter(connect(mapState, mapDispatch)(Sidebar))
