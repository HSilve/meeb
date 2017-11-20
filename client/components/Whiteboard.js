import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRoom, editNote, fetchNotes } from '../store'
import history from 'history'

export class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.positions = []
    this.clickImage = this.clickImage.bind(this);
    this.removePosition = this.removePosition.bind(this);

  }

  //In getBoundingClientREact:
  //x - left most margin of element
  //y- the bottom most margin of element
  //bottom - distance from top to bottom most margin
  componentDidMount() {
    this.props.fetchNotes(this.props.whiteboardId)
    let data = document.getElementById('whiteboard').getBoundingClientRect();
    let eNoteWidth = 270;
    let eNoteHeight = 150;
    // this.positions = this.generatePositionsArray(data.height, data.width, eNoteHeight, eNoteWidth, data.left, data.top );
    this.positions = this.generatePositionsArray(4000, 4000, eNoteHeight, eNoteWidth, data.left, data.top);

  }

  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // generate random positions
  generatePositionsArray(boardHeight, boardWidth, safeHeight, safeWidth, leftBegin, topBegin) {
    let irregularity = 0.5;
    // declarations
    var positionsArray = [];
    var r, c;
    var rows;
    var columns;
    // count the amount of rows and columns
    rows = Math.floor(boardHeight / safeHeight);
    columns = Math.floor(boardWidth / safeWidth);
    // loop through rows
    for (r = 1; r <= rows; r += 1) {
      // loop through columns
      for (c = 1; c <= columns; c += 1) {
        // populate array with point object
        positionsArray.push({
          x: Math.round(boardWidth * c / columns) + (this.getRandomInt(irregularity * -1, irregularity)) + (leftBegin / 4),
          y: Math.round(boardHeight * r / rows) + (this.getRandomInt(irregularity * -1, irregularity))
        });
      }
    }
    // return array
    return positionsArray;
  }
  // get random position from positions array
  getRandomPosition(removeTaken) {
    // declarations
    var randomIndex;
    var coordinates;
    // get random index
    randomIndex = this.getRandomInt(0, this.positions.length - 1);
    // get random item from array
    coordinates = this.positions[randomIndex];
    // check if remove taken
    if (removeTaken) {
      // remove element from array
      this.positions = [...this.positions.slice(0, randomIndex), ...this.positions.slice(randomIndex + 1)]
    }
    // return position
    return coordinates;
  }
  // getRandomPosition(positions, true)
  getPosition(noteId) {
    let pos = this.getRandomPosition(true);
    this.props.editNote(noteId, { position: [pos.x, pos.y] })
    return {
      style: {
        position: 'fixed',
        left: pos.x,    // computed based on child and parent's height
        top: pos.y   // computed based on child and parent's width
      }
    }
  }

  removePosition(takenPosition) {
    this.positions = this.positions.filter(aPosition =>
      (aPosition[0] != takenPosition[0]) && (aPosition[1] != takenPosition[1])
    )
  }

  clickImage(evt) {
    evt.preventDefault();

  }


  render() {
    let data = [];
    if (this.props.notes) {
      data = this.props.notes
      data.map(note => {
        note.position && this.removePosition(note.position)
      })
    }

    return (
      <div id="whiteboard">
        {
          data && data.map(note => {
            {
              return note.position ?
                (
                  <div className="card" key={note.id} style={{ position: 'absolute', left: note.position[0], top: note.position[1] }} >

                    {note.text &&
                      <div className="card-content">
                        {note.text}
                      </div>
                    }


                    {note.image &&
                      <div className="card-image">
                        <img onClick={this.clickImage} src={note.image} />
                      </div>
                    }


                    {note.link &&
                      <div className="card-action">
                        <a type="text/css" href={note.link}>Go Here </a>
                      </div>
                    }

                  </div>

                )

                :
                (
                  <div className="card" key={note.id} style={this.getPosition(note.id).style} >

                    {note.text &&
                      <div className="card-content">
                        {note.text}
                      </div>
                    }


                    {note.image &&
                      <div className="card-image">
                        <img onClick={this.clickImage} className="image" src={note.image} />
                      </div>
                    }


                    {note.link &&
                      <div className="card-action">
                        <a type="text/css" href={note.link}>Go Here </a>
                      </div>
                    }
                  </div>

                )
            }

          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ notes: state.notes })

const mapDispatchToProps = { fetchRoom, editNote, fetchNotes }

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
