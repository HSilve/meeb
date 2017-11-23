import React, { Component } from 'react';
import { connect } from 'react-redux';
import {newRoom, addNote} from '../store';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';

export class NewSessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      users: [],
      selected: []
    };
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  componentWillMount() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 1, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true // Close upon selecting a date,
    });

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        this.setState({ users });
      });
  }
  changeName(evt) {
    evt.preventDefault();
    this.setState({ roomName: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.newRoom(this.state.roomName, this.props.user, this.state.selected, evt.target.date.value, evt.target.time.value, {file: this.state.file, imageName: this.state.name, fileType: this.state.type, link: evt.target.noteLink.value, text: evt.target.noteText.value}
    )
  }

  handleFileUpload(evt) {
    evt.preventDefault();
    let reader = new FileReader();
    let imageFile = evt.target.files[0];
    reader.readAsDataURL(evt.target.files[0]);
    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        name: imageFile.name,
        type: imageFile.type
      })
    }
  }

  render() {
    return (
      <div className="row">
      <form className="col s6" id="formBox" onSubmit={this.handleSubmit}>
         Room Name:
         <input name="roomName" type="text" onChange={this.changeName} placeholder="Enter a name" />
         Date:
         <input type="date" name="date" className="datepicker" />
         Time:
         <input type="time" name="time" className="timepicker" />

        <div className="row" id = "formNote">
          Central Note
          <table>
          <tbody>
            <tr>
              <th><label>Text:</label></th>
              <td><input type="text" name="noteText" /></td>
            </tr>
            <tr>
              <th><label>Image</label></th>
              <td><input name="file" type="file" onChange={this.handleFileUpload}/></td>
            </tr>
            <tr>
              <th><label>Link:</label></th>
              <td><input type="link" name="noteLink" /></td>
            </tr>
          </tbody>
          </table>
        </div>
        <div className="row .browser-default">
            Invite Collaborators:
            <Typeahead
              onChange={(selected) => {
                this.setState({selected});
              }}
              bsSize={{label: 'Small', value: 'small'}}
              minLength= {3}
              emptyLabel = "true"
              selectHintOnEnter
              labelKey="name"
              multiple = {true}
              options={this.state.users}
              placeholder="Type a name..."
            />
        </div>
        <button>Start BrainStorming</button>
       </form>
     </div>
    );
  }
}
const mapState = (state) => ({
  user: state.user
})
const mapDispatch = {newRoom, addNote};

export default connect(mapState, mapDispatch)(NewSessionForm);
