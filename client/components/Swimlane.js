import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class Swimlane extends Component{
  constructor(props){
    super(props)
    this.state = {
      lane:[],
    }
  }
  render(){
    return(
      <div>
        <div className="row">
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s12">
            <svg className="swimlaneLine">
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Swimlane))
