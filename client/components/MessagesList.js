import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MessagesList extends Component {
  render () {
    return (
      <div>
        This messageList
      </div>
    );
  }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
