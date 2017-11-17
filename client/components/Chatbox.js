import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessageEntry from './MessageEntry'
import MessagesList from './MessagesList'

export class Chatbox extends Component {
  render(){
    return(
      <div>
        <MessagesList />
        <MessageEntry />
      </div>
    )
  }
}

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Chatbox)
