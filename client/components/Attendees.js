import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAttendees } from '../store'

export class Attendees extends Component {
  componentDidMount(){
    this.props.getAttendees()
  }
  render() {
    let names = ['Maria Betances', 'Blanca Sanchez', 'Evlis Henry', 'Erica Chai']
    return (
      <div className="row">
        <div className="col s3" id="sidePanel">
          <div className='chip'>
            <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
            Maria Betances
          </div>
          <div className='chip' id="sidePanel">
            <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
            Blanca Sanchez
          </div>
          <div className='chip' id="sidePanel">
            <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
            Evlis Henry
          </div>
          <div className='chip' id="sidePanel">
            <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
            Erica Chai
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    attendees: state.attendees
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAttendees: () => {
      dispatch(fetchAttendees())
    }
  }
}

export default connect(mapState, mapDispatch)(Attendees)
