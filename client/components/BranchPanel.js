import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { fetchRoom, modifyRoom } from '../store'

class BranchPanel extends Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       edges: [],
//       nodes: [],
//       connectionArray: [],
//     }
//     this.submitEdges = this.submitEdges.bind(this)
//   }
//
//   componentDidMount(){
//     this.props.getWhiteboard(this.props.match.params.id)
// }
//
//   submitEdges = (arr) => {
//     let edges = []
//     let parent = Number(arr.slice(0, 1))
//     console.log('parent', parent)
//     arr.slice(1).forEach(connection => {
//         edges.push({to: parent, from: connection})
//     })
//     console.log('edges', edges)
//     this.setState({edges: edges})
//   }

  render() {
    return (
      <div id="branch-panel" className="fixed-action-btn vertical click-to-toggle" onClick={() => {this.submitEdges(this.state.edges)}}>

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
