import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Chatbox from './Chatbox'
import Attendees from './Attendees'
import { fetchRoom } from '../store'

export class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getWhiteboard(id)
  }

  render() {
    const { show } = this.state
    return (
      <div className="sidebar">
        <button onClick={() => this.setState({ show: !show })}>-</button>
          {
            show ?
            <div>
              <h5 href="#">
              <div>Attendees</div>
              <i alt="Brand" className="glyphicon glyphicon-comment">
              </i>
              </h5>
              <Attendees />
              <Chatbox />
            </div> : null
          }
      </div>
    );
  }
}

// we can do all of this from attendees
const mapState = (state) => {
  return {
    whiteboard: state.singleWhiteboard,
    users: state.whiteboard.users
  }
}

const mapDispatch = (dispatch) => {
  return {
    getWhiteboard: (id) => {
      dispatch(fetchRoom(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Sidebar))
