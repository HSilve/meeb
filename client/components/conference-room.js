import React from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'


export default function ConferenceRoom() {
  console.log('ConferenceRoom', this.props.params)
  return (
    <div id="main-space">
      <Sidebar />
      <Whiteboard />
      <ActionPanel />
    </div>
  )
}
