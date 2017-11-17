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
      // <div className="row">
        <div className="col s3" id="sidePanel">
          {
            names.map(person => {
              return (
                <div className="row">
              <div className='chip'>
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
