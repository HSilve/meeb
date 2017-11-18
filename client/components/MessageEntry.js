import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../store/messageEntry'
import { fetchRoom } from '../store/whiteboard'
import { withRouter } from 'react-router-dom';

export class MessageEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getWhiteboard(id)
  }

  render() {
    const { handleSubmit, whiteboard } = this.props
    const { content } = this.state
    console.log('This is the MessageEntry whiteboardId', whiteboard)

    return (
      <form id="new-message-form" onSubmit={evt => handleSubmit(content, evt)}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="text"
            value={messageEntry.text}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  console.log('messageENtry mapstate', state.messageEntry)
  return {
    whiteboard: state.whiteboard,

  }
}

const mapDispatch = (dispatch) => {
  return {
    getWhiteboard: (id) => {
      dispatch(fetchRoom(id))
    },
    handleSubmit(message, evt) {
      evt.preventDefault()
      dispatch(addMessage(message))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(MessageEntry))
