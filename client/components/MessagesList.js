import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/messageEntry'
import { withRouter } from 'react-router'

export class MessagesList extends Component {
  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getMessages(id)
  }

  render () {
    const {messageEntry} = this.props
    console.log('allMessages', messageEntry.allMessages)
    return (
      <div id="live-chat">
        {
<<<<<<< HEAD
          messageEntry.allMessages &&  messageEntry.allMessages.map(message => {
            console.log('inside .map', message.user)
            return (<div className="blob" id="chat-message" key={message.id}>
              { message.user && <span className="chip">
                  <img src={message.user.image} /></span> }
                <span><b>{message.user.name}</b></span>
              <div>{message.text}</div>
=======
          messageEntry.allMessages && messageEntry.allMessages.map(message => {
            return (<div key={message.id} className="blob" key={message.id}>
              <span>{message.text}</span>
>>>>>>> origin/master
            </div>)
          })
        }
      </div>
    );
  }
}

const mapState = ({whiteboard, messageEntry}) => ({whiteboard, messageEntry})

const mapDispatch = (dispatch) => ({
  getMessages: (id) => {
    dispatch(fetchMessages(id))
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessagesList));
