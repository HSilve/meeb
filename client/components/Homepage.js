import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { newRoom, getRooms, removeRoom } from '../store/whiteboard'
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
          <div className="grid-example col s4">
            <h5 className="grey-text text-darken-3">Past Brainstorms</h5>
            <div className="collection">
              {
                this.props.allRooms.filter(room => {
                  return room.date < newdate ||
                    (room.date == newdate && room.startTime < newtime)
                })
                  .sort((room1, room2) => { return new Date(room2.date) - new Date(room1.date) })
                  .map(result => {
                    const user = this.props.user
                    return (
                      <div key={result.id} className="collection-item">

                        <NavLink className="blue-text text-darken-4" to={`/whiteboards/${result.id}`}>{result.name}</NavLink> <br />
                        {result.date}
                        {user.name == result.host ?
                          <span>
                            <span className="badge" >
                              <a className="waves-effect waves-light"><i onClick={event => this.props.deleteARoom(result.id)}
                                className="material-icons icon-grey">delete</i>
                              </a>
                            </span>
                            <span className="new badge" data-badge-caption="Hosted"></span>

                          </span>
                          : ''}

                      </div>
                    )
                  })

              }
            </div>
          </div>
          <div className="grid-example col s4">
            <h5 className="grey-text text-darken-3">Future Brainstorms</h5>
            <ul className="collection">
              {
                this.props.allRooms.filter(room => {
                  return room.date > newdate ||
                    (room.date == newdate && room.startTime >= newtime)
                })
                  .map(result => {
                    const user = this.props.user
                    return (
                      <div key={result.id} className="collection-item dataRow">

                        <NavLink className="blue-text text-darken-4" to={`/whiteboards/${result.id}`}>{result.name}</NavLink>
                        <div style={{float: 'right'}}>
                        {result.date}
                        </div>
                        <hr />
                        <label> Time: </label>
                        {result.startTime}
                        {user.name == result.host &&
                          <span>
                            <span className="badge" >
                              <a className="waves-effect waves-light"><i onClick={event => this.props.deleteARoom(result.id)} className="material-icons icon-grey">delete</i>
                              </a>
                            </span>
                            <span className="new badge" data-badge-caption="Hosted"></span>

                          </span>
                          }

                      </div>
                    )
                  })
              }
            </ul>
          </div>
          <div className="grid example col s4">
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
    },
    deleteARoom: function (id) {
      dispatch(removeRoom(id))
    }
  }
};

export default withRouter(connect(mapState, mapDispatch)(Homepage))
