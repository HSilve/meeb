import React, {Component} from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {fetchRoom} from '../store'


class ConferenceRoom extends Component {
  componentWillMount() {
    this.props.fetchRoom(this.props.match.params.id, this.props.user.id);
  }
  render ()  {
    return (
      <div id="main-space">
        <Sidebar />
        <Whiteboard />
        <ActionPanel />
      </div>
    )
  }
}

const mapState = (state) => ({user: state.user})
const mapDispatch = {fetchRoom}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
