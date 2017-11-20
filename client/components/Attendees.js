import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

export class Attendees extends Component {
  render() {

    const foundWhiteboard = this.props.whiteboard

    const { users } = foundWhiteboard
    return (
      <div>
        <p>Host: {foundWhiteboard.host}</p>
        {
          this.props.whiteboard.users && users.map(user => { return <div className="chip" key={user.id}>{user.name}</div> })
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    whiteboard: state.singleWhiteboard,
    user: state.user
  }
}

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Attendees))
