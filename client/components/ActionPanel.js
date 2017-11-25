/* eslint-disable max-params */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNote, closeRoom } from '../store'
import { withRouter } from 'react-router';

class ActionPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      expandToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false,
      file: [],
      name: '',
      type: ''
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  toggle(type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })
    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })
    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })
    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })
    else this.setState({ drawToggle: !this.state.drawToggle })
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

  render() {
    return (
      !this.props.whiteboard.closed &&
      <div className="fixed-action-btn horizontal click-to-toggle">
        <button className="btn-floating btn-large" type="submit" onClick={() => this.toggle('expand')}>+</button>
        {this.state.expandToggle &&
          <span>
            <div className="btn-floating" onClick={() => this.toggle('text')}>Text</div>
            <div className="btn-floating" onClick={() => this.toggle('image')}>Image</div>
            <div className="btn-floating" onClick={() => this.toggle('link')}>Link</div>
            <div className="btn-floating">Draw</div>
            <form onSubmit={(evt) => { evt.preventDefault(); this.props.handleSubmit(evt, this.state.file, this.state.name, this.state.type, this.props.user.id, this.props.match.params.id, this.props.notes.length) }} >
              {(this.state.textToggle || this.state.linkToggle) && <input name="text" type="text" />}
              {this.state.imageToggle &&
                <div>
                  <input name="file" type="file" onChange={this.handleFileUpload} />
                </div>
              }
              <button type="submit">Insert</button>
              {
              this.props.user.id == this.props.whiteboard.userId &&
                  <button
                      id="myBtn" onClick={() => {document.getElementById('myModal').style.display = 'block';}}>
                      End Session
                  </button>
              }
            </form>
          </span>
        }
            {/* <!-- The Modal --> */}
            <div id="myModal" className="modal">

              {/* <!-- Modal content --> */}
              <div className="modal-content">
                <span
                onClick ={ () => {document.getElementById('myModal').style.display = 'none';
              }}
                className="close">&times;</span>
                <h3>End Session </h3>
                <p>Are you sure you want to end collaboration on {this.props.whiteboard.name}? Collaborators will no longer be able to send messages or edit the whiteboard.</p>
                <button onClick={(evt) => {evt.preventDefault(); this.props.handleClose(this.props.whiteboard.id)}}> End Session </button>
              </div>
            </div>


      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    notes: state.notes,
    whiteboard: state.singleWhiteboard
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, file, imageName, fileType, userId, whiteboardId, noteIdx) {
      evt.preventDefault()
      whiteboardId = whiteboardId.toString()
      userId = userId.toString()
      const text = evt.target.text && evt.target.text.value
      const link = evt.target.link && evt.target.link.value
      const position = [1315 + (noteIdx * 5), 125 + (noteIdx * 5)]

      if (imageName || text || link ) {
      //ONLY WORKS IF USER IS LOGGED IN FIRST
      dispatch(addNote({ file, imageName, fileType, text, link, whiteboardId, userId, position }))
      }

    },
    handleClose(whiteboardId) {
      var date = new Date(); // for now
      let time =  date.getHours() + ':' + date.getMinutes();
      dispatch(closeRoom(whiteboardId, time))
      document.getElementById('myModal').style.display = 'none';

    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ActionPanel))
