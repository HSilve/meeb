import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class BranchPanel extends Component{
  render() {
    return(
      <div>
        <button className="btn-floating btn-large" type="submit">
          <img src={require("public/icons8-network-96.png")} alt="Submit" />
        </button>
      </div>
    )
  }
}

export const submitEdges = (arr) => {
  let edges = []
  let parent = arr.slice(0, 1)
  console.log('parent', parent)
  arr.slice(1).forEach(connection => {
      edges.push({to: parent, from: connection})
  })
  console.log('edges', edges)
  return edges
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(BranchPanel))
