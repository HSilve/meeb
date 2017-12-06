import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Attendees extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    }
    this.showAtt = this.showAtt.bind(this);
  }

  showAtt = (evt) => {evt.preventDefault(); this.setState({show: !this.state.show})}

  render() {
    const foundWhiteboard = this.props.whiteboard
    return (
      <div id="attendee-box">
        <button

          onClick={this.showAtt}>
          <div>Host: </div>
          <div>{foundWhiteboard.host}</div>

        </button>
        {
        this.state.show &&
        <ul id="attendees" >
          {
            this.props.attendees.map(user => {
              return (
                <li className="chip" style={{fontSize: 12}} key={user.id}>
                {
                    user.whiteboards[0].attendees.attended ?
                    <img className="circle green" />
                    :
                    <img className="circle pink darken-4" />
                }
                    {user.name}
                </li>
                )
              })
          }
        </ul>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    whiteboard: state.singleWhiteboard,
    user: state.user,
    attendees: state.attendees.list
  }
}

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Attendees))
