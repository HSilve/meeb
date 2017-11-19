import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class Attendees extends Component {
  render() {
    console.log('Attendees this.props', this.props)
    return (
      <div>
        Maria Betances
      </div>
    )
  }
}

const mapState = ({whiteboard, users}) => ({whiteboard, users})

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Attendees));
