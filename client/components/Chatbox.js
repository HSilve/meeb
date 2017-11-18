import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessageEntry from './MessageEntry'
import MessagesList from './MessagesList'
import {fetchAttendees} from '../store/'

export class Chatbox extends Component {

  render(){
    console.log('Chatbox', this.props.whiteboardId)
    return(
      <div>
        <MessagesList />
        <MessageEntry />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    attendees: state.attendees,
    whiteboardId: ownProps.whiteboardId
  }
}
const mapDispatch = (dispatch) => {
  return {
    getAttendees: (id) => {
      dispatch(fetchAttendees(id))
    },
  }
}

export default connect(mapState, mapDispatch)(Chatbox)