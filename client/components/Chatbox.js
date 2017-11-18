import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessageEntry from './MessageEntry'
import MessagesList from './MessagesList'
import {fetchAttendees} from '../store/'

export class Chatbox extends Component {
  // componentDidMount(){
  //   const {id} = this.props.match.params
  //   this.props.getAttendees(id)
  // }
  render(){
    console.log('Chatbox', this.props.match)
    return(
      <div>
        <MessagesList />
        <MessageEntry />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    attendees: state.attendees
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
