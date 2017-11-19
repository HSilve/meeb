import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Whiteboard extends Component {
  constructor (props) {
    super(props)
    this.positions = []

  }
  componentWillMount () {
    // declarations

    // this.positions = this.generatePositionsArray(2400, 1600, 40, 10);
        this.positions = this.generatePositionsArray(800, 800, 60, 1);

    // this.positions = this.generatePositionsArray(800, 800, 40, 10);

  }

  componentDidMount () {
    // declarations
    let data = document.getElementById('whiteboard').getBoundingClientRect();
    console.log("bounding client", data )
  }

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

// generate random positions
    generatePositionsArray(maxX, maxY, safeRadius, irregularity) {
        // declarations
        var positionsArray = [];
        var r, c;
        var rows;
        var columns;
        // count the amount of rows and columns
        rows = Math.floor(maxY / safeRadius);
        columns = Math.floor(maxX / safeRadius);
        // loop through rows
        for (r = 1; r <= rows; r += 1) {
            // loop through columns
            for (c = 1; c <= columns; c += 1) {
                // populate array with point object
                positionsArray.push({
                    x: Math.round(maxX * c / columns) + this.getRandomInt(irregularity * -1, irregularity),
                    y: Math.round(maxY * r / rows) + this.getRandomInt(irregularity * -1, irregularity)
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
            // this.positions = this.positions.splice(randomIndex, 1)
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
            position: 'absolute',
            left: pos.x,    // computed based on child and parent's height
            top: pos.y   // computed based on child and parent's width
          }
        }
      }


  render() {
    let notes = [
      {id: 1, text: 'The Best Idea In The World', highlighted: true, link: 'http://www.github.com', userId: 6, whiteboardId: 1, position: []},
     {id: 2, text: 'Just about the worst Idea Ever', userId: 1, whiteboardId: 1, position: []},
     {id: 3, text: "I'm just a lone note", userId: 2, whiteboardId: 2, position: []},
    {id: 4, text: 'I wanna be a branch off the best idea', image: 'http://completecarnivore.com/wp-content/uploads/2016/07/short-rib-location.jpg', userId: 4, whiteboardId: 1, position: []}
    ]
    return (
      <div id="whiteboard">
      {
        notes.map(note => {
          return (<div key={note.id} style = {this.getPosition().style} >
            {note.text}
            </div>
          )
        } )
      }
      </div>
    );
  }
}

const mapStateToProps = null
//  {
//   return {notes: state.whiteboard.notes}
// }

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
