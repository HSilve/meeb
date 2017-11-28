import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Chatbox from './Chatbox'
// import Attendees from './Attendees'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    const { show } = this.state
    return (
      <div className="sidebar white">
        <div className="btn black" style={{borderCornerShape: 'circle'}} onClick={() => this.setState({ show: !show })}>^Messages^</div>
          {
            show && <Chatbox />
          }
      </div>
    );
  }
}

const mapState = null

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Sidebar))
