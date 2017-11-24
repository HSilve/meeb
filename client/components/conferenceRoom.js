import React, {Component} from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees} from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {fetchRoom, announceUser} from '../store'


class ConferenceRoom extends Component {
  componentWillMount() {
    this.props.announceUser(this.props.user.id, this.props.match.params.id);
  }
  render ()  {
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

const mapState = (state) => ({user: state.user})
const mapDispatch = {fetchRoom, announceUser}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
