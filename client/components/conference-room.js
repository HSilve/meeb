import React, {Component} from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'
import {connect} from 'react-redux'


export class ConferenceRoom extends Component {
  render(){
    console.log('ConferenceRoom', this.props)
    return (
      <div id="main-space">
        <Sidebar />
        <Whiteboard />
        <ActionPanel />
      </div>
  )}
}

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(ConferenceRoom)
