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
    console.log('this.props', this.props)
    console.log('this.props.match', this.props.match)
    // const {id} = this.props.match.params
    // this.props.getAttendees(id)
  }

  handleChange(evt) {
    const {value} = evt.target
    this.setState({content: value})
  }

  render(){
    const {handleSubmit} = this.props
    const {content} = this.state
    console.log('this.props.text', this.props.text)
    console.log('this.state', content)
    console.log('this.props', this.props)
    return (
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
    )
  }
}

const mapState = (state) => {
  return {
    text: state.text,
    userId: state.userId,
    attendees: state.attendees
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
