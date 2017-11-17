import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../store/messageEntry'

export class MessageEntry extends Component{
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  // componentDidMount(){
  //   const {id} = this.props.match.params
  // }

  render(){
    const {handleSubmit} = this.props
    const {content} = this.state

    return(
      <form id="new-message-form" onSubmit={evt => handleSubmit(content, evt)}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={content}
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (message, evt) {
      evt.preventDefault()
      dispatch(addMessage(message))
    }
  }
}

export default connect(mapState, mapDispatch)(MessageEntry)
