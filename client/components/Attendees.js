import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {fetchRoom} from '../store'

class Attendees extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    }
    this.showAtt = this.showAtt.bind(this);
  }
  componentDidMount() {
    this.props.fetchRoom(this.props.match.params.id)
  }
  showAtt = (evt) => {evt.preventDefault(); this.setState({show: !this.state.show})}

  render() {
    const foundWhiteboard = this.props.whiteboard
    const { users } = foundWhiteboard
    return (
      <div id="attendee-box" className="horizontal">
        <button

          onClick={this.showAtt}>
          <a>Host: {foundWhiteboard.host}</a>

        </button>
        {
        this.state.show &&
        <div id="attendees" >
          {
            this.props.whiteboard.users && users.map(user => {
                  return (
                    <span className="chip" key={user.id}>
                    {
                        user.attended ?
                        <img className="circle green" />
                        :
                        <img className="circle red" />
                    }
                         <a> {user.name}</a>
                   </span>
                   )
                })
          }
        </div>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    whiteboard: state.singleWhiteboard,
    user: state.user
  }
}

const mapDispatch = {fetchRoom}

export default withRouter(connect(mapState, mapDispatch)(Attendees))
