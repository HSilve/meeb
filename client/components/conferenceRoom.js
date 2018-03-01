import React, { Component } from 'react'
import { Sidebar, Whiteboard, ActionPanel, Attendees } from './index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {announceSelf, fetchCollaborators, fetchRoom, modifyRoom, denounceCollaborator, announceCollaborator} from '../store'
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
    // this.props.announceSelf(this.props.user.id, boardId);
    this.props.announceCollaborator(this.props.user.id, boardId);
  }

  componentDidUpdate() {
    if (this.props.person) {
      Materialize.toast(`${this.props.person}, has entered the session`, 3000) // 4000 is the duration of the toast
      this.props.denounceCollaborator();
    }
  }

  render() {
    let userActions = [
      {iconName: 'format_quote', title:'Insert Text'},
      {iconName: 'add_a_photo', title:'Insert Images'},
      {iconName: 'insert_link', title:'Insert File'},
      {iconName: 'brush', title:'Color Notes'},
      {iconName: 'flash_on', title:'Vote'}
    ];
    let hostActions = [
      {iconName: 'view_column', title:'Add Swimlanes'},
      {iconName: 'flash_on', title:'Open Voting'},
      {iconName: 'flash_off', title:'Close Voting'},
      {iconName: 'device_hub', title:'Toggle Branches'},
      {iconName: 'close', title:'End Session'}
    ];
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

                <div className= "">
                <table className= "striped bordered">
                <thead>
                  <tr>
                    <td><b><i className="material-icons">add</i>User Actions:</b></td>
                    <td><b><i className="material-icons">settings</i>Host Actions:</b></td>
                    </tr>
                </thead>
                <tbody>
                  {
                    userActions.map ((act, idx) =>
                    <tr key={idx}>
                      <td><a className='black-text'><i className="material-icons">
                      {act.iconName}</i>
                      {act.title}
                      </a>
                      </td>
                      <td style={{borderLeft: 'thin solid black'}}><a className='black-text'><i className="material-icons">
                      {hostActions[idx].iconName}</i>
                      {hostActions[idx].title}
                      </a>
                      </td>
                    </tr>
                    )
                  }
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
const mapDispatch = {announceSelf, fetchCollaborators, fetchRoom, modifyRoom, denounceCollaborator, announceCollaborator}

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
