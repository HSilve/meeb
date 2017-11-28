import React, { Component } from 'react'
import {connect} from 'react-redux'
import MessageEntry from './MessageEntry'
import MessagesList from './MessagesList'
import { withRouter } from 'react-router'

class Chatbox extends Component {
  render(){
    return (
      <div className="chat-box">
        {/* <div className="chat-header">
          Messages
       </div> */}
       <div className="popup-box">
      <MessagesList />
      </div>
      <MessageEntry />
      </div>
    )
  }
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Chatbox))
