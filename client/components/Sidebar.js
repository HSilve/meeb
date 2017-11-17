import React, {Component} from 'react'
import {connect} from 'react-redux'
import Attendees from './Attendees'

export class Sidebar extends Component{

  render(){
    return (
      <div className="sidebar-header">
        <h3 href="#">
          <div>Attendees</div>
          <i alt="Brand" className="glyphicon glyphicon-comment">
          </i>
        </h3>
      <Attendees />
      </div>
    );
  }
}


const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Sidebar)
