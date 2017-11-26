import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { newRoom, getRooms } from '../store/whiteboard'
import { withRouter } from 'react-router'
import { NewSessionForm } from './index'


class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllRooms(this.props.user)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.user !== nextProps.user) {
      this.props.getAllRooms(nextProps.user)
    }
  }

  navlink(result, user) {

    return (<div key={result.id}>
      <NavLink to={`/whiteboards/${result.id}`}>{result.name}</NavLink>
    </div>
    )

  }

  render() {
    const { show } = this.state

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();

    var newdate = year + "-" + month + "-" + day;
    var newtime = hours + ":" + minutes;

    return (
      <div className="row">
        <h2>Welcome, {this.props.user.name}</h2>

        <div className="grid-example col s12">
          <div className="grid-example col s3">
            <h5 className="grey-text text-darken-3">Past Brainstorms</h5>
            <ul className="collapsible" data-collapsible="accordion">
              {
                this.props.allRooms.filter(room => {
                  return room.date < newdate ||
                    (room.date == newdate && room.startTime < newtime)
                })
                  .map(result => {
                    const user = this.props.user
                    return (
                      <li key={result.id}>
                        <div className="collapsible-header">
                          {this.navlink(result, user)}
                          {user.name == result.host ?
                            <span class="new badge" data-badge-caption="Hosted"></span> : ''}
                        </div>
                      </li>
                    )
                  })

              }
            </ul>
          </div>
          <div className="grid-example col s3">
            <h5 className="grey-text text-darken-3">Future Brainstorms</h5>
            <ul className="collapsible" data-collapsible="accordion">
              {
                this.props.allRooms.filter(room => {
                  return room.date > newdate ||
                    (room.date == newdate && room.startTime >= newtime)
                })
                  .map(result => {
                    const user = this.props.user
                    return (
                      <li key={result.id}>
                        <div className="collapsible-header">
                          {this.navlink(result, user)}
                          {user.name == result.host ?
                            <span className="new badge" data-badge-caption="Hosted"></span> : ''}
                        </div>
                      </li>
                    )
                  })
              }
            </ul>
          </div>
          <div className="grid example col s6">
            <a className="waves-effect waves-light btn" onClick={() => this.setState({ show: !show })}>Create New Session</a>
            {
              show ?
                <span>
                  <h5 href="#">
                    <i alt="Brand" >
                    </i>
                  </h5>
                  <NewSessionForm />
                </span> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {

  return {
    user: state.user,
    allRooms: state.whiteboard
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRoom: function (user) {
      dispatch(newRoom(user))
    },
    getAllRooms: function (user) {
      dispatch(getRooms(user))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(Homepage))
