import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRoom} from '../store'

export class Whiteboard extends Component {
  constructor (props) {
    super(props)
    this.positions = []
    this.clickAnImage = this.clickAnImage.bind(this);
    this.clickALink = this.clickALink.bind(this);
  }

//In getBoundingClientREact:
//x - left most margin of element
//y- the bottom most margin of element
//bottom - distance from top to bottom most margin
  componentWillMount () {
    // declaration
    // this.positions = this.generatePositionsArray(2400, 1600, 40, 10);
        // this.positions = this.generatePositionsArray(800, 800, 60, 1);
    // this.positions = this.generatePositionsArray(800, 800, 40, 10);
  }

  componentDidMount () {
    let data = document.getElementById('whiteboard').getBoundingClientRect();
    let eNoteWidth = 270;
    let eNoteHeight = 100;
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
      getPosition() {
        let pos = this.getRandomPosition(true);
        return {
          style: {
            position: 'fixed',
            left: pos.x,    // computed based on child and parent's height
            top: pos.y   // computed based on child and parent's width
          }
        }
      }


  render() {
    let data = [];
    if (this.props.notes) {data = this.props.notes}

    return (
      <div id="whiteboard">
      {
        data.map(note => {
          return (
            <div className="aNote" key={note.id} style = {this.getPosition().style} >
            <div>
              { note.text &&
                note.text
              }
            </div>
            <div>
              { note.image &&
                <img onClick ={this.clickAnImage} className="image" src={note.image} />
              }
            </div>
            <div>
              { note.link &&
                <a type="text/css" href={note.link}>Go Here </a>
              }
            </div>
            </div>

          )
        } )
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({notes: state.whiteboard.notes})

const mapDispatchToProps = {fetchRoom}

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);

