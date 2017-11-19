import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRoom } from '../store'

export class Attendees extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // const {id} = this.props.match.params
    // this.props.getRoom(id)
  }
  componentDidMount(){
    // const {id} = this.props.match.params
    // this.props.getRoom(id)
  }
  render() {

    let users = [];
    if(this.props.users) {users = this.props.users}

    return (
      // <div className="row">
        <div className="col s3" id="sidePanel">
          {
            users.map(person => {
              return (
              <div key={person} className="row">
                <div className='chip' >
                  <img src="https://vignette.wikia.nocookie.net/fantendo/images/3/3d/HC_Minion_Icon.png/revision/latest?cb=20140211171359" alt="Pic" />
                  {person.name}
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

const mapState = (state) => ({users: state.whiteboard})

const mapDispatch = (dispatch) => {
  return {
    getRoom: (id) => {
      dispatch(fetchRoom(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Attendees)


// let names = ['Maria Betances', 'Blanca Sanchez', 'Evlis Henry', 'Erica Chai']
