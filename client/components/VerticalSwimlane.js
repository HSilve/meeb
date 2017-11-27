import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class VerticalSwimlane extends Component{
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
            <input type='text' />
            <svg className="verticalSwimlane">
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(VerticalSwimlane))
