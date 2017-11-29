import React, { Component } from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
<<<<<<< HEAD
import {announceCollaborator, fetchCollaborators, fetchRoom, modifyRoom} from '../store'
=======
import { announceCollaborator, fetchCollaborators, fetchRoom } from '../store'
>>>>>>> origin/master
import VerticalSwimlane from './VerticalSwimlane'

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
    this.onClickVertical = this.onClickVertical.bind(this)
  }
  componentDidMount() {
    let boardId = this.props.match.params.id;
    this.props.fetchRoom(boardId);
    this.props.fetchCollaborators(boardId);
    this.props.announceCollaborator(this.props.user.id, boardId);
  }

  onClickVertical(evt, num) {
    evt.preventDefault()
    const newWhiteboard = {...this.props.singleWhiteboard, swimlane: num,
      categories: Array(num).fill('')}
    this.props.modifyRoom(newWhiteboard)
  }

  render() {
    if (this.props.person.userName) {
      Materialize.toast(`${this.props.person.userName}, has entered the session`, 4000) // 4000 is the duration of the toast
    }
    let swimlaneArray = []
    const {singleWhiteboard} = this.props
    for (let i = 0; i < singleWhiteboard.swimlane; i++) {
        swimlaneArray.push(<VerticalSwimlane category={singleWhiteboard.categories[i]} index={i} key={i} />)
    }
    return (
      <div>
      <div id="main-space">
        <Attendees />
        <Sidebar />

          {
              swimlaneArray ?
                swimlaneArray.map((element) => {
                return element
              }
            )
          : null
        }
        <Whiteboard />
        <ActionPanel />
          <div className="fixed-action-btn horizontal click-to-toggle" id="laneButton">
            <a className="btn-floating btn-large red">
              <i className="material-icons">menu</i>
            </a>
            <ul>
              <li><a className="btn-floating red" onClick={(evt) => this.onClickVertical(evt, 3)}><i className="material-icons"></i></a></li>
              <li><a className="btn-floating yellow darken-1" onClick={(evt) => this.onClickVertical(evt, 4)}><i className="material-icons"></i></a></li>
              <li><a className="btn-floating green" onClick={(evt) => this.onClickVertical(evt, 2)}><i className="material-icons"></i></a></li>
              <li><a className="btn-floating pink" onClick={(evt) => this.onClickVertical(evt, 0)}><i className="material-icons"></i></a></li>
            </ul>
          </div>
          </div>

          <ActionPanel toggleIt={this.onClickVertical} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleWhiteboard: state.singleWhiteboard,
  user: state.user,
  person: state.attendees.justEntered
})
const mapDispatch = {announceCollaborator, fetchCollaborators, fetchRoom, modifyRoom}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
