import React from 'react'
import { Sidebar, Whiteboard, ActionPanel } from './index'


export default function ConferenceRoom() {
  return (
    <div id="main-space">
      <Sidebar />
      <Whiteboard />
      <ActionPanel />
    </div>
  )
}
