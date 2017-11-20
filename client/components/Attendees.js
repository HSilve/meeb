import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Attendees extends Component {
  render() {
    const { whiteboard } = this.props
    const { users }  = whiteboard
    return (
      <div>
        <p>Host: {whiteboard.host}</p>
        {
          whiteboard.users && users.map(user => {return <div className="chip" key={user.id}>{user.name}</div>})
        }
      </div>
    )
  }
}

const mapState = ({whiteboard, users}) => ({whiteboard, users})

const mapDispatch = null

export default connect(mapState, mapDispatch)(Attendees)
