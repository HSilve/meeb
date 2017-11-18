import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Chatbox } from './Chatbox'

export class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        <h3 href="#">
          <div>Attendees</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h3>
        <Chatbox />
      </div>
    );
  }
}


const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Sidebar)
