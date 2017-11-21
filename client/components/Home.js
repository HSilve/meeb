/* eslint-disable complexity */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionPanel } from './index'
import { insertNote, removeNote } from '../store'

export class Home extends Component {
  constructor() {
    super()
    this.notePositions = []
    this.noteId = 0
    this.state = {
      expandToggle: false,
      dragging: false,
      rel: null,
      pos: {x: null, y: null},
      selectedNote: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.notePositions[++this.noteId] = [500, 250]
    this.props.createNote({ id: this.noteId, text: evt.target.text.value, position: this.notePositions[this.noteId] })
  }

  //when user clicks mouse down, dragging state is set to true and new relative position
  //is calculated, the position is set to null
  onMouseDown(evt) {
    if (evt.button !== 0) return

    var pos = evt.target.getBoundingClientRect()
    this.setState({
      dragging: true,
      rel: {
        x: evt.pageX - pos.left,
        y: evt.pageY - pos.top
      },
      pos: {
        x: null,
        y: null
      }
    })
    evt.stopPropagation()
    evt.preventDefault()
  }

  //once mouse is released, the new position of note is updated in db
  //and dragging is set to false
  onMouseUp(evt) {
    // this.props.editNote(this.state.selectedNote, {position: [this.state.pos.x, this.state.pos.y]})
    this.notePositions[this.state.selectedNote] = [this.state.pos.x, this.state.pos.y]
    evt.stopPropagation()
    evt.preventDefault()
    this.setState({dragging: false})
  }

  //when state.pos is set to anything but null, the top and left of card is set to state.pos instead of note.position[0] & note.position[1]
  onMouseMove(evt) {
    if (!this.state.dragging) return
    const xVal = evt.pageX - this.state.rel.x
    const yVal = evt.pageY - this.state.rel.y

    let xLimit, yLimit = 0
    if (xVal > 450) xLimit = 450
    if (xVal < 10) xLimit = 10

    if (yVal > 650) yLimit = 650
    if (yVal < 200) yLimit = 200

    this.setState({
      pos: {
        x: (xVal > 450 || xVal < 10) ? xLimit : xVal,
        y: (yVal > 650 || yVal < 200)  ? yLimit : yVal
      }
    })
    evt.stopPropagation()
    evt.preventDefault()
  }

  render() {
    const { whiteboard, notes, handleRemove } = this.props
    return (
      <div className="home-whiteboard">
        <div className="children">
          <h1>HOME</h1>
          <div id="mini-whiteboard">
            { notes && notes.map(note => { return (
              <div
                className="card"
                key={note.id}
                style = {{position: 'absolute', left: this.state.selectedNote === note.id && this.state.pos.x || this.notePositions[note.id][0], top: this.state.selectedNote === note.id && this.state.pos.y || this.notePositions[note.id][1], cursor: 'pointer' }}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                onMouseDown={(evt) => {this.setState({ selectedNote: note.id }); this.onMouseDown(evt)}} >

              <button value={note.id} onClick={() => handleRemove(note.id)}>x</button>

                { note.text &&
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
          }
        )}
        </div>
        </div>

        <div className="fixed-action-btn horizontal click-to-toggle">
          <button className="btn-floating btn-large" type="submit" onClick={() => this.setState({ expandToggle: !this.state.expandToggle })}>+</button>
          { this.state.expandToggle &&
            <form onSubmit={ this.handleSubmit }>
              <input name="text" type="text" />
              <button type="submit">Insert</button>
            </form>
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({ whiteboard: state.singleWhiteboard, notes: state.notes })

const mapDispatch = dispatch => {
  return {
    createNote(note) {
      dispatch(insertNote(note))
    },
    handleRemove(noteId) {
      dispatch(removeNote(noteId))
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
