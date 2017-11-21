import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createRoom} from '../store';
import axios from 'axios';
import {Typeahead} from 'react-bootstrap-typeahead';

export class NewSessionForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      songId: 1,
      error: false,
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        console.log("users", users);
        this.setState({ users });
      });
  }

  handleChange (evt) {
    this.setState({
      userId: evt.target.value,
      error: false
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    const userId = this.state.songId;
    console.log("the event",evt.target.selectPeople.value);
    let names = document.getElementsByClassName('rbt-token');
    console.log("the doc els", names[0].innerHTML)

    // this.props.addCollaborators(userId)
    //   .catch(err => {
    //     this.setState({err, error: true });
    //   });
  }

  render () {
    const users = this.state.users;

    return (
      <div className="row">
      <form className="col s4 push-s3" onSubmit={this.handleSubmit}>
         Room Name:
         <input name="roomName" type="text" onChange={this.changeName} placeholder="Room Name" />
     <div className="row">
        <label> Invite Collaborators: </label>
         <Typeahead
          emptyLabel = 'true'
          selectHintOnEnter
          labelKey="name"
          multiple = {true}
          options={this.state.users}
          placeholder="Invite Collaborators..."
        />
         </div>
        <button>Start BrainStorming</button>
       </form>
     </div>
    );
  }
}
const mapState = null;
// (state) => ({
//   user: state.user
// })
const mapDispatch = {createRoom};

export default connect(mapState, mapDispatch)(NewSessionForm);




//   constructor(props) {
//     super(props);
//     this.state = {
//       roomName: '',
//       people: ''
//     }
//     this.changeName = this.changeName.bind(this);
//     this.changePeople = this.changePeople.bind(this);
//     this.submit = this.submit.bind(this);
//   }
//   componentWilMount() {
//     this.props.fetchUsers();
//     $('input.autocomplete').autocomplete({
//       data: {
//         Apple: null,
//         Microsoft: null,
//         Google: 'https://placehold.it/250x250'
//       },
//       limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
//       onAutocomplete: function(val) {
//         this.setState({people: val})
//       },
//       minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
//     });
//   }
//   changeName(evt) {
//     evt.preventDefault();
//     this.setState({roomName: evt.target.value})
//   }
//   changePeople(evt) {
//     evt.preventDefault();
//     let input = evt.target.value;
//     this.setState({people: evt.target.value});

//   }

//   submit(evt) {
//     evt.preventDefault();
//     let attendees = this.state.people.split(';');
//     const name = this.state.roomName;
//     // this.props.createRoom(name, this.props.user, attendees);
//     console.log(name, this.props.user, attendees);
//   }
//   render (){
//    return (
    //  <div className="row">
    //  <form className="col s4 push-s3" onSubmit={this.submit}>
    //     Room Name:
    //     <input name="roomName" type="text" onChange={this.changeName} placeholder="Room Name" />
    //    Invite Collaborators:
    //    <input name="people" type="text" onChange={this.changePeople} placeholder="Names seperated by commas" />

    // <div className="col s12">
    //   <div className="row">
    //     <div className="input-field col s12">
    //       <input type="text" id="autocomplete-input" className="autocomplete" />
    //       <label htmlFor="autocomplete-input">Autocomplete</label>
    //       {/* <ul className="autocomplete-content dropdown-content"></ul> */}
    //     </div>
    //   </div>
    // </div>

    //    <button>Start BrainStorming</button>
    //   </form>
    // </div>
//    )
//   }
// }
