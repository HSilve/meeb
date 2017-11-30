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
    const { messageEntry } = this.props
    return (
      <div id="live-chat">
          <ul className="collection">
        {
           messageEntry.allMessages.map(message => {
            return (
              <li className="collection-item avatar chat-list" key={message.id}>
                <img src={message.user.image} alt="" className="circle" />
                <span className="title"><b>{message.user.name}</b></span>
                <p>{message.text}
                </p>
              </li>

            )
          })
        }
        </ul>
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
