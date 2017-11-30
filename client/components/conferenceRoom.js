import React, { Component } from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {announceCollaborator, fetchCollaborators, fetchRoom, modifyRoom, denounceCollaborator} from '../store'
// import VerticalSwimlane from './VerticalSwimlane'

class ConferenceRoom extends Component {
  constructor(props) {
    super(props)
    // this.onClickVertical = this.onClickVertical.bind(this)
  }
  componentDidMount() {
    let boardId = this.props.match.params.id;
    this.props.fetchRoom(boardId);
    this.props.fetchCollaborators(boardId);
    this.props.announceCollaborator(this.props.user.id, boardId);
  }

  render() {
    if (this.props.person.userName) {
      Materialize.toast(`${this.props.person.userName}, has entered the session`, 4000) // 4000 is the duration of the toast
      this.props.denounceCollaborator();
    }
    // let swimlaneArray  = []
    // const {singleWhiteboard} = this.props
    // for (let i = 0; i < singleWhiteboard.swimlane; i++) {
    //     swimlaneArray.push(<VerticalSwimlane category={singleWhiteboard.categories[i]} index={i} key={i} />)
    // }
    return (
      <div>
      <div id="main-space">
        <Attendees />
        <Sidebar />
        <Whiteboard />
        <ActionPanel />
          {/* <!-- The Intro Modal--> */}
          <div id="introModal" className="modal" style={{display: 'block'}}>

            {/* <!-- Modal content --> */}
            <div className="modal-content">
            <div className="row">

                <div className= "col s4">
                <table className= "striped bordered">
                <thead>
                  <tr><td><h5><i className="material-icons">add</i>Legend:</h5></td></tr>
                </thead>
                <tbody>
                    <tr><td><a><i className="material-icons">
                      format_quote</i></a> : Insert Text
                      </td></tr>
                    <tr><td><a><i className="material-icons">
                        add_a_photo</i></a> : Insert Images
                        </td></tr>
                    <tr><td><a><i className="material-icons">
                        insert_link</i></a> : Insert Images
                        </td></tr>
                    <tr><td><a><i className="material-icons">
                        brush</i></a> : Color Notes
                        </td></tr>
                    <tr><td><a><i className="material-icons">
                          ⚡️</i></a> : Vote for note
                          </td></tr>
                </tbody>
                </table>
                </div>
                <div className= "col s4">
                <table className= "striped bordered">
                <thead>
                  <tr><td><h5><i className="material-icons">person</i>Host Legend:</h5></td></tr>
                </thead>
                <tbody>
                  <tr><td><a><i className="material-icons">
                      view_column</i></a> : Add swimlanes
                      </td></tr>
                  <tr><td><a><i className="material-icons">
                        flash_on</i></a>
                        : Open voting
                        </td></tr>
                  <tr><td><a><i className="material-icons">
                        flash_off</i></a>
                        : Close voting
                        </td></tr>
                  <tr><td><a><i className="material-icons">
                      close</i></a> : End Session
                      </td></tr>
              </tbody>
              </table>
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
      </div>
    )
  }
}

const mapState = (state) => ({
  singleWhiteboard: state.singleWhiteboard,
  user: state.user,
  person: state.attendees.justEntered
})
const mapDispatch = {announceCollaborator, fetchCollaborators, fetchRoom, modifyRoom, denounceCollaborator}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
