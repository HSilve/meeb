import React from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'
import {connect} from 'react-redux'


export function ConferenceRoom(props) {
  console.log(props)
  return (
    <div id="main-space">

      <Sidebar />
      <Whiteboard whiteboardId={props.match.params.id} />
      <ActionPanel />
    </div>
  )
}

const mapState = null

export default connect(mapState)(ConferenceRoom)
