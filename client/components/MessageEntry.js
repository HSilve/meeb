import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../store/MessageEntry'
import {fetchAttendees} from '../store/whiteboardAttendees'

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
    this.props.getAttendees(whiteboardId)
    console.log('MessageEntry', this.props.attendees)
  }

  // componentWillReceiveProps(nextProps){
  //   if (this.props.whiteboard.match !== nextProps.whiteboard.match) {
  //     this.props.getAttendees(nextProps.whiteboard.match)
  //     console.log('this.state.attendees', this.state.attendees)
  //   }
  // }

  handleChange(evt) {
    const {value} = evt.target
    this.setState({content: value})
  }

  render(){
    const {handleSubmit} = this.props
    const {content} = this.state
    console.log('this is my content', content)
    return (
      <div>
        {
          // <p>whiteboard Id: {whiteboardId}</p>
        }
      <form id="new-message-form" onSubmit={evt => handleSubmit(content, evt)}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={content}
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
  return {
    text: state.text,
    userId: state.userId,
    attendees: state.attendees,
    whiteboardId: ownProps.whiteboardId
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAttendees: (id) => {
      dispatch(fetchAttendees(id))
    },
    handleSubmit (message, evt) {
      evt.preventDefault()
      dispatch(addMessage(message))
    }
  }
}

export default connect(mapState, mapDispatch)(MessageEntry)
