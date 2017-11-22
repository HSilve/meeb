import React, {Component} from 'react';
import { connect } from 'react-redux';
import {newRoom, addNote} from '../store';
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead';

export class NewSessionForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roomName: '',
      users: [],
      selected: []
    };
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        this.setState({ users });
      });
  }
  changeName(evt) {
        evt.preventDefault();
        this.setState({roomName: evt.target.value})
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.newRoom(this.state.roomName, this.props.user, this.state.selected)
    let reader = new FileReader();
    let imageFile = evt.target.file
    reader.readAsDataURL(evt.target.file)
    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        name: imageFile.name,
        type: imageFile.type
      })
    }
    this.props.addNote({
      file: reader.result, image: imageFile.name, fileType: imageFile.type, text: evt.target.noteText.value, link: evt.target.noteLink.value, whiteboardId: this.props.match.params.id.toString(), userId: this.props.user.id
    })
  }

  render () {
    return (
      <div className="row">
      <form className="col s4 push-s3" id="formBox" onSubmit={this.handleSubmit}>
         Room Name:
         <input name="roomName" type="text" onChange={this.changeName} placeholder="Enter a name" />
        <div className="row" id = "formNote">
          Central Note
          <table>
            <tr>
              <th><label>Text:</label></th>
              <td><input type="text" name="noteText" /></td>
            </tr>
            <tr>
              <th><label>Image</label></th>
              <td><input name="file" type="file" /></td>
            </tr>
            <tr>
              <th><label>Link:</label></th>
              <td><input type="text" name="noteLink" /></td>
            </tr>

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
