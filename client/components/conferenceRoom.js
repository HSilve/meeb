import React, { Component } from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { announceCollaborator, fetchCollaborators, fetchRoom } from '../store'
import VerticalSwimlane from './VerticalSwimlane'

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verticalSwimlane: false,
      horizontalSwimlane: false,
      swimlaneArray: [],
    }
    this.onClickVertical = this.onClickVertical.bind(this)
    this.multipleLanes = this.multipleLanes.bind(this)
  }
  componentWillMount() {
    let boardId = this.props.match.params.id;
    this.props.fetchRoom(boardId);
    this.props.fetchCollaborators(boardId);
    this.props.announceCollaborator(this.props.user.id, boardId);
  }

  multipleLanes(num) {
    while (num > 0) {
      num--
      console.log('while loop', num)
      console.log('swimlaneArray', this.state.swimlaneArray)
      this.state.swimlaneArray.push(<VerticalSwimlane key={num} />)
    }
  }

  onClickVertical(evt) {
    evt.preventDefault()
    if (this.state.swimlaneArray.length) {
      this.setState({ swimlaneArray: [] })
    }
    this.setState({ verticalSwimlane: !this.state.verticalSwimlane })
    this.multipleLanes(3)
  }

  render() {
    if (this.props.person.userName) {
      Materialize.toast(`${this.props.person.userName}, has entered the session`, 4000) // 4000 is the duration of the toast
    }
    const { verticalSwimlane } = this.state
    return (
      <div>
        <div id="main-space">
          <Attendees />
          <Sidebar />
          {
            verticalSwimlane ?
              this.state.swimlaneArray
              : null
          }
          <Whiteboard />
          <ActionPanel />
          <div className="laneButton">
            <button onClick={(evt) => this.onClickVertical(evt)}>
              Swimlane
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  person: state.attendees.justEntered
})
const mapDispatch = { announceCollaborator, fetchCollaborators, fetchRoom }

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
