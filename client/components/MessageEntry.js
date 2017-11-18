import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../store/messageEntry'
import {fetchRoom} from '../store/whiteboard'

export class MessageEntry extends Component{
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }


  componentDidMount(){
    const {whiteboardId} = this.props
    this.props.getRoom(whiteboardId)
  }

  handleChange(evt) {
    const {value} = evt.target
    this.setState({content: value})
  }

  render(){
    const {handleSubmit, whiteboardId, messageEntry} = this.props
    const {content} = this.state
    console.log('this is my content', content)
    return (
      <div>
        {
          <p>WhiteboardID: {whiteboardId}</p>
        }
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
    messageEntry: state.messageEntry,
    whiteboardId: ownProps.whiteboardId,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRoom: (id) => {
      dispatch(fetchRoom(id))
    },
    handleSubmit (message, evt) {
      evt.preventDefault()
      dispatch(addMessage(message))
    }
  }
}

export default connect(mapState, mapDispatch)(MessageEntry)
