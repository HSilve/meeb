import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRoom } from '../store'
import {withRouter} from 'react-router'

export class Attendees extends Component {
  componentDidMount(){
    const {id} = this.props.match.params
    this.props.getRoom(id)
  }
  render() {
    let names = ['Maria Betances', 'Blanca Sanchez', 'Evlis Henry', 'Erica Chai']
    const {users} = this.props

    return (
      // <div className="row">
        <div className="col s3" id="sidePanel">
          {
            names.map(person => {
              return (
              <div className="row">
                <div className='chip' >
                  <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
                  {person}
                </div>
              </div>
              )
            })
          }

        </div>
      // </div>
    )
  }
}

const mapState = (state) => {
  return {
    whiteboard: state.whiteboard,
    users: state.attendees
  }
}

const mapDispatch = (dispatch) => {
  return {
    getRoom: (id) => {
      dispatch(fetchRoom(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Attendees))
