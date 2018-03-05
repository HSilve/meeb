import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/messageEntry'
import { withRouter } from 'react-router'

export class MessagesList extends Component {
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.getMessages(id);
  }
  componentWillUpdate() {
    var element = document.getElementById('live-chat');
    element.scrollTop = element.scrollHeight;
  }

  render () {
    console.log('the props', this.props)
    const { messageEntry, userId} = this.props
    return (
      <div id="live-chat">
          <ul className="">
        {
           messageEntry.allMessages.map(message =>
              (message.user.id !== userId ?
              <li className="chat-list row" key={message.id}>
              <div className="col s2" style={{padding: 0}}>
              <img src={message.user.image} alt="" className="circle smallImg" />
              </div>
              <div className="col s10" style={{padding: 0}}>
              <div className="message-box">
              <div>{message.text}</div>
              <div className="smallName" >{message.user.name}</div>
              </div>
              </div>
              </li>
              :
              <li className="chat-list row" key={message.id}>
              <div className="col s10" style={{paddingRight: 0}}>
              <div className="message-box self">
                <div>{message.text}</div>
                <div className="smallName" >{message.user.name}</div>
              </div>
              </div>
              <div className="col s2" style={{paddingLeft: 0}}>
                <img src={message.user.image} alt="" className="circle smallImg" />
              </div>
              </li>)

          )
        }
        </ul>
      </div>
    );
  }
}

const mapState = ({whiteboard, messageEntry, user}) => ({whiteboard, messageEntry, userId: user.id})

const mapDispatch = (dispatch) => ({
  getMessages: (id) => {
    dispatch(fetchMessages(id))
  }
})

export default withRouter(connect(mapState, mapDispatch)(MessagesList));
