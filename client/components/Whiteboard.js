import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Whiteboard extends Component {
  constructor (props) {
    super(props)
  }
  top() {
    //create random top position
  }
  left() {
    //create random left position
  }
  randomPos () {
   return  {
      position: 'absolute',
      top: top(),    // computed based on child and parent's height
      left: left()   // computed based on child and parent's width
    }
  }

  render() {
    let notes = [
      {text: 'The Best Idea In The World', highlighted: true, link: "http://www.github.com", userId: 6, whiteboardId: 1},
     {text: 'Just about the worst Idea Ever', userId: 1, whiteboardId: 1 },
     {text: "I'm just a lone note", userId: 2, whiteboardId: 2 },
    {text: 'I wanna be a branch off the best idea', image: 'http://completecarnivore.com/wp-content/uploads/2016/07/short-rib-location.jpg', userId: 4, whiteboardId: 1 }
    ]
    return (
      <div id="whiteboard">
      {
        notes.map(note =>{
          return (<div style = {this.randomPos}>
            {note.text}
            </div>
          )
        } )
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
