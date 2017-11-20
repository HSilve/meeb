import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/messageEntry'
import { withRouter } from 'react-router'

export class MessagesList extends Component {
  componentDidMount(){
    this.props.getMessages()
  }

  render () {
    const { messageEntry } = this.props
    return (
      <div id="live-chat">
        {
          messageEntry.allMessages &&  messageEntry.allMessages.filter(message =>
            message.whiteboard.id === Number(this.props.match.params.id)
          ).map(message => {
            return (<div className="blob" id="chat-message" key={message.id}>
              <span className="chip">
                <img src={message.user.image} />
              </span>
              <span><b>{message.user.name}</b></span>
              <div>{message.text}</div>
            </div>)
          })
        }
      </div>
    );
  }
}

const mapState = ({whiteboard, messageEntry}) => ({whiteboard, messageEntry})

const mapDispatch = (dispatch) => ({
  getMessages: () => {
    dispatch(fetchMessages())
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessagesList));
