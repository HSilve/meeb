import React, {Component} from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'
import { connect } from 'react-redux'


export class ConferenceRoom extends Component{
  render() {
    console.log('ConferenceRoom', this.props.whiteboardId)
    return (
      <div id="main-space">
        <Sidebar whiteboardId={this.props.whiteboardId} />
        <Whiteboard />
        <ActionPanel />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    whiteboardId: ownProps.match.params.id
  }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(ConferenceRoom)
