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
          <ActionPanel toggleIt={this.onClickVertical} />
        </div>
          {/* <!-- The Intro Modal--> */}
          <div id="introModal" className="modal" style={{display: 'block'}}>

            {/* <!-- Modal content --> */}
            <div className="modal-content">
            <div className="row">

                <div className= "col s4">
                <table className= "striped bordered">
                <thead>
                  <tr><h5><i className="material-icons">add</i>Legend:</h5></tr>
                </thead>
                <tbody>
                    <tr><a><i className="material-icons">
                      format_quote</i></a> : Insert Text
                    </tr>
                    <tr><a><i className="material-icons">
                        add_a_photo</i></a> : Insert Images
                    </tr>
                    <tr><a><i className="material-icons">
                        insert_link</i></a> : Insert Images
                    </tr>
                    <tr><a><i className="material-icons">
                        brush</i></a> : Color Notes
                    </tr>
                    <tr><a><i className="material-icons">
                          ⚡️</i></a> : Vote for note
                    </tr>
                </tbody>
                </table>
                </div>
                <div className= "col s4">
                <table className= "striped bordered">
                <thead>
                  <tr><h5><i className="material-icons">person</i>Host Legend:</h5></tr>
                </thead>
                <tbody>
                  <tr><a><i className="material-icons">
                      view_column</i></a> : Add swimlanes
                  </tr>
                  <tr><a><i className="material-icons">
                        flash_on</i></a>
                        : Open voting
                  </tr>
                  <tr><a><i className="material-icons">
                        flash_off</i></a>
                        : Close voting
                  </tr>
                  <tr><a><i className="material-icons">
                      close</i></a> : End Session
                  </tr>
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
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  person: state.attendees.justEntered
})
const mapDispatch = { announceCollaborator, fetchCollaborators, fetchRoom }

export default withRouter(connect(mapState, mapDispatch)(ConferenceRoom))
