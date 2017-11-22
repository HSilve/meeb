import React, {Component} from 'react';
import { connect } from 'react-redux';
import {newRoom} from '../store';
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead';

export class LoginSignup extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3"><a href="#test1">Test 1</a></li>
          <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li>
        </ul>
      </div>
      <div id="test1" class="col s12">Test 1</div>
      <div id="test2" class="col s12">Test 2</div>
    </div>
    )
  }
}
const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(LoginSignup);
