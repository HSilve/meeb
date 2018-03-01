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
    return (
      <div id="attendee-box">
        <i className="material-icons" onClick={this.showAtt}>people</i>
        {
        this.state.show &&
        <ul id="attendees" >
          {
            this.props.attendees && this.props.attendees.map(user =>
                (<li style={{fontSize: 12}} key={user.id}>
                    {user.name}
                </li>)
              )
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
