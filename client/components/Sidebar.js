import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Chatbox from './Chatbox'
// import Attendees from './Attendees'
import {resetMessageCount} from '../store'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.toggleMessageBox = this.toggleMessageBox.bind(this);
  }
  toggleMessageBox() {
    this.setState({ show: !this.state.show });
    this.props.resetMessageCount();
  }

  render() {
    const { show } = this.state;
    let {newMessageCount} = this.props;
    return (
      <div className="sidebar white">
        <div
            className="btn grey darken-4"
            onClick= {this.toggleMessageBox}
              >
              {/* ↓Messages↓ */}
          {
            // (newMessageCount > 0 && !this.state.show) &&
            // <a style={{float: 'right'}} className="new badge red #0277bd"> {newMessageCount} new</a>
            <a>↓Messages↓ <a className="new badge yellow">{newMessageCount} new</a></a>
          }
        </div>
          {
            show && <Chatbox />
          }
      </div>
    );
  }
}

const mapState = (state) => ({newMessageCount: state.messageEntry.count})

const mapDispatch = {resetMessageCount}

export default withRouter(connect(mapState, mapDispatch)(Sidebar))
