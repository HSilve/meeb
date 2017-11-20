import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/messageEntry'
import { withRouter } from 'react-router'

export class MessagesList extends Component {
  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getMessages(id)
    this.sortDate = this.sortDate.bind(this)
  }

// TO DO, sort messages based on dates!!!
  sortDate(arr){
    arr.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)})
  }

  render () {
    const {messageEntry} = this.props
    console.log(messageEntry.allMessages)
    return (
      <div>
        {
          messageEntry.allMessages.map(message => {
            return (<div className="chip" key={message.id}>
              <span>{message.text}</span>
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
