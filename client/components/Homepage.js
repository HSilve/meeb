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

  render() {
    const { show } = this.state
    return (
      <div className="row">
        <h2>Welcome, {this.props.user.name}</h2>

        <div className="grid-example col s12">
          <div className="grid-example col s3">
            <h5>Past Brainstorms</h5>
            {
              this.props.allRooms.filter(room => {

                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var hours = dateObj.getHours();
                var minutes = dateObj.getMinutes();

                var newdate = year + "-" + month + "-" + day;
                var newtime = hours + ":" + minutes;

                return room.date < newdate ||
                  (room.date == newdate && room.startTime < newtime)
              })
                .map(result => {
                  return (<div key={result.id}>
                    <NavLink to={`/whiteboards/${result.id}`}>{result.name}</NavLink>
                  </div>
                  )
                })
            }
          </div>
          <div className="grid-example col s3">
            <h5>Future Brainstorms</h5>
            {
              this.props.allRooms.filter(room => {

                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var hours = dateObj.getHours();
                var minutes = dateObj.getMinutes();

                var newdate = year + "-" + month + "-" + day;
                var newtime = hours + ":" + minutes;


                return room.date > newdate ||
                  (room.date == newdate && room.startTime >= newtime)
              })
                .map(result => {
                  return (<div key={result.id}>
                    <NavLink to={`/whiteboards/${result.id}`}>{result.name}</NavLink>
                  </div>
                  )
                })
            }
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
