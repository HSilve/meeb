import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Whiteboard extends Component {
  render() {
    return (
      <div id="whiteboard">
        This is our whiteboard!
      </div>
    );
  }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
