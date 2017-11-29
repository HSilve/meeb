import React, { Component } from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {announceCollaborator, fetchCollaborators, fetchRoom, modifyRoom} from '../store'
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
          {/* <!-- The Intro Modal--> */}
          <div id="introModal" className="modal" style={{display: 'block'}}>

            {/* <!-- Modal content --> */}
            <div className="modal-content">
            <div className="row">
                <div className= "col s6">
                  <ul><h5>Legend:</h5>
                    <li><a><i className="material-icons">
                      format_quote</i></a> : Insert Text
                    </li>
                    <li><a><i className="material-icons">
                        add_a_photo</i></a> : Insert Images
                    </li>
                    <li><a><i className="material-icons">
                        insert_link</i></a> : Insert Images
                    </li>
                    <li><a><img src="/icons8-fill-color-30.png" align="center" alt="Branch" /></a> : Color Notes
                    </li>
                    <li><a><i className="material-icons">
                          ⚡️</i></a> : Vote for note
                    </li>
                  </ul>
                </div>
                <div className= "col s6">
                  <ul><h5>Host Legend:</h5>
                  <li><a><i className="material-icons">
                      view_column</i></a> : Add swimlanes.
                  </li>
                  <li><a><i className="material-icons">
                        thumb_up</i></a>
                        : Open voting.
                  </li>
                  <li><a><i className="material-icons">
                        thumb_down</i></a>
                        : Close voting.
                  </li>
                  <li><a><i className="material-icons">
                      close</i></a> : End Session.
                  </li>
                </ul>
              </div>
          </div>
          <span
                onClick={() => {
                  document.getElementById('introModal').style.display = 'none';
                }}
                className="close btn">Start Brainstorming</span>
            </div>

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
