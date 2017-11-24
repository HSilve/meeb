import React, {Component} from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees} from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {announceCollaborator, fetchCollaborators} from '../store'


class ConferenceRoom extends Component {
  componentWillMount() {
    let boardId = this.props.match.params.id;
    this.props.fetchCollaborators(boardId)
    this.props.announceCollaborator(this.props.user.id, boardId);
  }
  render ()  {
    if (this.props.person.userName) {
      Materialize.toast(`${this.props.person.userName}, has entered the session`, 4000) // 4000 is the duration of the toast
    }
    return (
      <div id="main-space">
        <Attendees />
        <Sidebar />
        <Whiteboard />
        <ActionPanel />
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  person: state.attendees.justEntered
})
const mapDispatch = {announceCollaborator, fetchCollaborators}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
