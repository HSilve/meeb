
/* eslint-disable max-params */
import React from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { addNote, closeRoom, openVote, editNote, emptyBranches, fetchBranches, modifyRoom, updateNoteArray, clearNoteArray, getNoteArray } from '../store'
import { withRouter } from 'react-router';
import { VoteResults } from './index';
import { TwitterPicker } from 'react-color'

class ActionPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false,
      toggleBranches: true,
      file: [],
      name: '',
      type: '',
      show: false
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.toggleBranches = this.toggleBranches.bind(this)
    this.onClickVertical = this.onClickVertical.bind(this)
  }

  handleColorChange = (color) => {
    if (this.props.update.length) {
      this.props.update.forEach(note => {
        document.getElementById(`card${note}`).style.background = color.hex
        this.props.colorUpdate(note, { color: color.hex })
        let selectedCard = document.getElementById(`card${note}`)
        selectedCard.style.boxShadow = '0 4px 2px -2px gray'
      })
      this.props.updateNotesForColor([])
    }
    this.setState({ connectionArray: [] })
    this.props.clearSelect();
  }

  toggle(type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })
    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })
    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })
    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })
  }

  toggleBranches(swimlane) {
    this.setState({ toggleBranches: swimlane > 0 ? false : !this.state.toggleBranches }, function() {
      this.state.toggleBranches ? this.props.showBranches(this.props.whiteboard.id) : this.props.hideBranches(this.props.whiteboard.id)
      if (!this.state.toggleBranches) d3.selectAll('line').remove()
    })
  }

  handleFileUpload(evt) {
    evt.preventDefault()
    let reader = new FileReader();
    let imageFile = evt.target.files[0]
    reader.readAsDataURL(evt.target.files[0])
    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        name: imageFile.name,
        type: imageFile.type
      })
    }

  }

  onClickVertical(evt, num) {
    evt.preventDefault()
    if (this.props.whiteboard.swimlane){
      num = 0
    }
    const newWhiteboard = {...this.props.whiteboard, swimlane: num,
      categories: Array(num).fill('')}
    this.props.updateRoom(newWhiteboard)
    this.toggleBranches(num)
  }

  render() {
    return (
      <div>
        {!this.props.whiteboard.closed &&
          <div className="fixed-action-btn" style={{ bottom: '25px', right: '24px' }} >
            <a className="btn-floating btn-large" type="submit" ><i className="material-icons">add</i></a>

            <span>
              <ul>
                <li><a className="btn-floating" onClick={() => this.toggle('text')}><i className="material-icons">format_quote</i></a></li>
                <li><a className="btn-floating" onClick={() => this.toggle('image')}><i className="material-icons">add_a_photo</i></a></li>
                <li><a className="btn-floating" onClick={() => this.toggle('link')}><i className="material-icons">insert_link</i></a></li>
                <li><a className="btn-floating" onClick={() => this.setState({ show: !this.state.show })}><i className="material-icons">brush</i></a>
                  {
                    this.state.show ?
                      <TwitterPicker onChange={this.handleColorChange} />
                      : null
                  }
                </li>
              </ul>
              <form
                  id="actionForm"
                  onSubmit={(evt) => { evt.preventDefault();
                      this.props.handleSubmit(evt, this.state.file, this.state.name, this.state.type, this.props.user.id, this.props.match.params.id, this.props.notes.length);
                      this.setState({ expandToggle: false, textToggle: false, imageToggle: false, linkToggle: false }) }}
                    style={{ bottom: '90px', right: '100px', position: 'fixed' }}>
                {(this.state.textToggle) && <div><input name="text" type="text" /></div>}
                {(this.state.linkToggle) && <div><input name="link" type="text" /></div>}
                {this.state.imageToggle &&
                  <div>
                    <input name="file" type="file" onChange={this.handleFileUpload} />
                  </div>
                }
                {(this.state.textToggle || this.state.linkToggle || this.state.imageToggle) && <button type="submit">Insert</button> }
              </form>
            </span>

          </div>}
        {
          this.props.user.id === this.props.whiteboard.userId &&
          !this.props.whiteboard.closed &&
          <div className="fixed-action-btn horizontal" style={{ bottom: '25px', right: '100px' }} >
            <a className="btn-floating btn-large" type="submit" ><i className="material-icons">settings</i></a>

            <span>
              <ul>
                <li>
                  <a className=" btn-floating" id="myBtn" onClick={(evt) => { evt.preventDefault(); this.onClickVertical(evt, 3); }}><i className="material-icons">
                    view_column
                    </i></a>
                </li>


                {
                  !this.props.whiteboard.voteable ?
                    <li>
                      <a className="btn-floating" id="myBtn" onClick={(evt) => { evt.preventDefault(); this.props.letsVote(this.props.whiteboard.id) }}><i className="material-icons">
                        flash_on</i>
                      </a>
                    </li>
                    :
                    <li>
                      <a className="btn-floating" id="myBtn" onClick={(evt) => { evt.preventDefault(); this.props.closeVote(this.props.whiteboard.id, this.props.whiteboard.voteable) }}><i className="material-icons">
                        flash_off</i>
                      </a>
                    </li>
                }
                <li>
                  <a className="btn-floating" id="myBtn" onClick={() => this.toggleBranches() }><i className="material-icons">
                    device_hub</i>
                  </a>
                </li>
                <li>
                  <a className="btn-floating" id="myBtn" onClick={() => { document.getElementById('myModal').style.display = 'block'; }}>
                    <i className="material-icons">
                      close</i>
                  </a>
                </li>

              </ul>
            </span>
          </div>
        }
        {/* <!-- The Modal To End Session--> */}
        <div id="myModal" className="modal">

          {/* <!-- Modal content --> */}
          <div className="modal-content">
            <button
              onClick={() => {
                document.getElementById('myModal').style.display = 'none';
              }}
              className="close">X</button>
            <h3>End Session </h3>
            <p>Are you sure you want to end collaboration on {this.props.whiteboard.name}? Collaborators will no longer be able to send messages or edit the whiteboard.</p>
            <button onClick={(evt) => { evt.preventDefault(); this.props.handleClose(this.props.whiteboard.id) }}> End Session </button>
          </div>
        </div>
        {/* <!-- The Modal for Voting Results --> */}
        <div id="theVoteResult" className="modal">

          {/* <!-- Modal content --> */}
          <div className="modal-content">
              <button
              onClick={() => {
                document.getElementById('theVoteResult').style.display = 'none';
              }}
              className="close">X</button>
            <h3>Vote Results </h3>
            <VoteResults />
            <button onClick={(evt) => { evt.preventDefault(); this.props.handleClose(this.props.whiteboard.id) }}> End Session </button>
          </div>
        </div>

      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    user: state.user,
    notes: state.notes,
    whiteboard: state.singleWhiteboard,
    toggle: ownProps.toggleIt,
    update: state.update
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    handleSubmit(evt, file, imageName, fileType, userId, whiteboardId, noteIdx) {
      evt.preventDefault()
      whiteboardId = whiteboardId.toString()
      userId = userId.toString()
      const text = evt.target.text && evt.target.text.value;
      const link = evt.target.link && evt.target.link.value;
      let data = document.getElementById('basket').getBoundingClientRect();
      let body = document.body
      console.log(`body pos: `, body.scrollTop)
      const position = [data.x + (noteIdx * 5) + window.pageXOffset, data.y + (noteIdx * 5) + window.pageYOffset];

      document.getElementById('actionForm').reset();

      if (imageName || text || link) {
        //ONLY WORKS IF USER IS LOGGED IN FIRST
        dispatch(addNote({ file, imageName, fileType, text, link, whiteboardId, userId, position }))
      }

    },
    handleClose(whiteboardId) {
      var date = new Date(); // for now
      let time = date.getHours() + ':' + date.getMinutes();
      dispatch(closeRoom(whiteboardId, time))
      document.getElementById('myModal').style.display = 'none';

    },
    letsVote(whiteboardId, voting) {
      dispatch(openVote(whiteboardId, !voting))
    },
    closeVote(whiteboardId, voting) {
      dispatch(openVote(whiteboardId, !voting))
      document.getElementById('theVoteResult').style.display = 'block';
    },
    colorUpdate(note, color) {
      dispatch(editNote(note, color))
    },
    showBranches(whiteboardId) {
      dispatch(fetchBranches(whiteboardId))
    },
    hideBranches(whiteboardId) {
      dispatch(emptyBranches(whiteboardId))
    },
    updateRoom(room){
      dispatch(modifyRoom(room))
    },
    updateNotesForColor(arr) {
      dispatch(updateNoteArray(arr))
    },
    clearSelect(){
      dispatch(clearNoteArray());
    },
    getSelected() {
      dispatch(getNoteArray());
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ActionPanel))
