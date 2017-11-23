import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { fetchRoom, modifyRoom } from '../store'

class BranchPanel extends Component{
  constructor(props){
    super(props)
    this.state = {
      edges: [],
      nodes: [],
    }
    this.submitEdges = this.submitEdges.bind(this)
  }

  componentDidMount(){
    this.props.getWhiteboard(this.props.match.params.id)
  }

  submitEdges = (arr) => {
    let edges = []
    let parent = Number(arr.slice(0, 1))
    console.log('parent', parent)
    arr.slice(1).forEach(connection => {
        edges.push({to: parent, from: connection})
    })
    console.log('edges', edges)
    this.setState({edges: edges})
  }

  render() {
    console.log('branch-panel', this.props)
    return (
      <div id="branch-panel" className="fixed-action-btn vertical click-to-toggle" onClick={() => {this.submitEdges(this.state.edges)}}>
        <a className="btn-floating btn-large white">
          <img src="/icons8-network-40.png" align="center" alt="Branch" />
        </a>
        <ul>
          <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
          <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
          <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
          <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
        </ul>
      </div>
    )
  }
}

const mapState = ({singleWhiteboard, notes}) => ({singleWhiteboard, notes})
const mapDispatch = (dispatch) => {
  return {
    getWhiteboard: (id) => {
      dispatch(fetchRoom(id))
    },
    updateNotes: (room) => {
      dispatch(modifyRoom(room))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(BranchPanel))
