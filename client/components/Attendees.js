import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Attendees extends Component {
  render(){
    return(
      <div>
        <div className='chip'>
          <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
          Maria Betances
        </div>
        <div className='chip'>
          <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
          Blanca Sanchez
        </div>
        <div className='chip'>
          <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
          Evlis Henry
        </div>
        <div className='chip'>
          <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
          Erica Chai
        </div>
      </div>
    )
  }
}

const mapState = null

const mapDispatch = null

export default connect(mapState, mapDispatch)(Attendees)
