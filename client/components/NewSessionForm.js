import React, {Component} from 'react';
import { connect } from 'react-redux';
import {newRoom} from '../store';
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
  }

  render () {
    return (
      <div className="row">
      <form className="col s4 push-s3" onSubmit={this.handleSubmit}>
         <label>Room Name:</label>
         <input name="roomName" type="text" onChange={this.changeName} placeholder="Enter a name" />
     <div className="row .browser-default">
        <label> Invite Collaborators: </label>
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
const mapDispatch = {newRoom};

export default connect(mapState, mapDispatch)(NewSessionForm);
