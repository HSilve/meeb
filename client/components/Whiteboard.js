import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRoom, editNote} from '../store'
import ReactDOM from 'react-dom'

export class Whiteboard extends Component {
  constructor (props) {
    super(props)
    this.positions = []
    this.notes = {}
    this.state = {
      dragging: false,
      rel: null,
      pos: {x: this.state && this.notes[this.state.selectedNote].position[0] || 0,
        y: this.state && this.notes[this.state.selectedNote].position[1] || 0},
      selectedNote: 0
    }
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.clickImage = this.clickImage.bind(this);
    this.removePosition = this.removePosition.bind(this);

  }

//In getBoundingClientREact:
//x - left most margin of element
//y- the bottom most margin of element
//bottom - distance from top to bottom most margin
  componentDidMount () {
    let data = document.getElementById('whiteboard').getBoundingClientRect();
    let eNoteWidth = 270;
    let eNoteHeight = 150;
    this.positions = this.generatePositionsArray(data.height, data.width, eNoteHeight, eNoteWidth, data.left, data.top );
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
      this.props.editNote(noteId, {position: [pos.x, pos.y]})
      return {
        style: {
          position: 'fixed',
          left: pos.x,    // computed based on child and parent's height
          top: pos.y   // computed based on child and parent's width
        }
      }
    }

  onMouseDown(evt) {
    if (evt.button !== 0) return
    // var computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this))
    // pos = { top: parseInt(computedStyle.top), left: parseInt(computedStyle.left) }
    var pos = this.notes[this.state.selectedNote].getBoundingClientRect()
    console.log(this.notes[this.state.selectedNote].getBoundingClientRect())
    this.setState({
      dragging: true,
      rel: {
        x: evt.pageX - pos.left,
        y: evt.pageY - pos.top
      }
    })
    evt.stopPropagation()
    evt.preventDefault()
  }

  onMouseUp(e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseMove(e) {
    console.log('enter')
    if (!this.state.dragging) return
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    })
    console.log(this.state.pos)
    e.stopPropagation()
    e.preventDefault()
  }
    removePosition(takenPosition) {
      this.positions = this.positions.filter(aPosition =>
        (aPosition[0] != takenPosition[0]) && (aPosition[1] != takenPosition[1])
      )
    }

    clickImage (evt) {
      evt.preventDefault();

    }


  render() {
    let data = [];
    if (this.props.notes) {data = this.props.notes}
    console.log(this.notes)
    return (
      <div id="whiteboard">
      {
        data.map(note => {
          {

            note.position && this.removePosition(note.position)
          return   note.position ?
             (
                  <div className="card" key={note.id} style = {{position: 'absolute', left: note.position[0], top: note.position[1] }} >

                    { note.text &&
                      <div className="card-content">
                        {note.text}
                      </div>
                    }


                    { note.image &&
                      <div className="card-image">
                        <img onClick={this.clickImage} src={note.image} />
                        </div>
                    }


                    { note.link &&
                      <div className="card-action">
                        <a type="text/css" href={note.link}>Go Here </a>
                      </div>
                    }

                  </div>

                )

            :
              (
                  <div className="card" key={note.id} style = {this.getPosition(note.id).style} >

                    { note.text &&
                      <div className="card-content">
                        {note.text}
                      </div>
                    }


                    { note.image &&
                      <div className="card-image">
                        <img onClick={this.clickImage} className="image" src={note.image} />
                      </div>
                    }


                    { note.link &&
                      <div className="card-action">
                        <a type="text/css" href={note.link}>Go Here </a>
                      </div>
                    }
                  </div>

                )
              }

        } )
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({notes: state.whiteboard.notes})

const mapDispatchToProps = {fetchRoom, editNote}

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
