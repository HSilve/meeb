import React, { Component } from 'react'
import { connect } from 'react-redux'
import Attendees from './Attendees'
import { Chatbox } from './Chatbox'

export class Sidebar extends Component {

  render() {
    console.log('Sidebar', this.props)
    console.log('Sidebar whiteboardId', this.props.whiteboardId)
    return (
      <div className="sidebar">
        <h3 href="#">
          <div>Attendees</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h3>
        <Attendees />
        <Chatbox whiteboardId={this.props.whiteboardId}/>
      </div>
    );
  }
}


const mapState = (state, ownProps) => {
  return {
    whiteboardId: ownProps.whiteboardId
  }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(Sidebar)
