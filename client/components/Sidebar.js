import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Chatbox } from './Chatbox'
import { Attendees } from './Attendees'
import { fetchRoom } from '../store'

export class Sidebar extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getWhiteboard(id)
  }

  render() {
    console.log('sidebar this.props', this.props)
    return (
      <div className="sidebar">
        <h5 href="#">
          <div>Attendees</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h5>
        <Attendees {...this.props}/> {/*TO DO*/}
        <Chatbox />
      </div>
    );
  }
}

// we can do all of this from attendees
const mapState = (state) => {
  return {
    whiteboard: state.singleWhiteboard,
    users: state.whiteboard.users
  }
}

const mapDispatch = (dispatch) => {
  return {
    getWhiteboard: (id) => {
      dispatch(fetchRoom(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Sidebar))
