import React from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


export function ConferenceRoom() {
  return (
    <div id="main-space">

      <Sidebar />
      <Whiteboard />
      <ActionPanel />
    </div>
  )
}

const mapState = null

export default withRouter(connect(mapState)(ConferenceRoom))
