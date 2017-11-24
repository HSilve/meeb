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
      <div id="attendee-box" className="horizontal">
        <button

          onClick={this.showAtt}>
          <a>Host: {foundWhiteboard.host}</a>

        </button>
        {
        this.state.show &&
        <div id="attendees" >
          {
            this.props.attendees.map(user => {
              return (
                <span className="chip" key={user.id}>
                {
                    user.whiteboards[0].attendees.attended ?
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
    user: state.user,
    attendees: state.attendees.list
  }
}

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Attendees))
