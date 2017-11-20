import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class Attendees extends Component {
  render() {
    //getting whiteboard id
    const whiteboardId = this.props.match.params.id
    //finding the whiteboard in array of whiteboard returned from state
    const foundWhiteboard = this.props.whiteboard.find((whiteboard) => {
      return whiteboardId == whiteboard.id
    })
    //getting users from that found whiteboard
    const { users } = foundWhiteboard
    console.log('FOUND---', foundWhiteboard)
    return (
      <div>
        <p>Host: {foundWhiteboard.host}</p>
        {
          users.map(user => { return <div key={user.id}>{user.name}</div> })
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    whiteboard: state.whiteboard,
    user: state.user
  }
}

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Attendees))
