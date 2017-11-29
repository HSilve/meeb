/* eslint-disable complexity */
import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { Footer } from './index'
import { insertNote, removeNote, getNotes } from '../store'

export class Home extends Component {
  constructor() {
    super()
    this.notePositions = []
    this.noteId = -1
    this.state = {
      expandToggle: false,
      dragging: false,
      rel: null,
      pos: {x: null, y: null},
      selectedNote: -1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  componentDidMount() {
    this.props.emptyNotes()
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.notePositions[++this.noteId] = [680, 1500]
    this.props.createNote({ id: this.noteId, text: evt.target.text.value, position: this.notePositions[this.noteId] })
  }

  //when user clicks mouse down, dragging state is set to true and new relative position
  //is calculated, the position is set to null
  onMouseDown(evt) {
    if (evt.button !== 0) return
    var pos = evt.target.getBoundingClientRect()
    var bodyPos = document.body.getBoundingClientRect()
    // var whiteboardPos = document.getElementById('mini-whiteboard').getBoundingClientRect()
    // var bodyWhiteboard = Math.abs(bodyPos.top) - whiteboardPos.top
    this.setState({
      dragging: true,
      rel: {
        x: evt.pageX - pos.left,
        y: evt.pageY - (Math.abs(bodyPos.top) + pos.top)
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
    if (this.state.pos.x !== null && this.state.pos.y !== null) this.notePositions[this.state.selectedNote] = [this.state.pos.x, this.state.pos.y]
    evt.stopPropagation()
    evt.preventDefault()
    this.setState({dragging: false})
  }

  //when state.pos is set to anything but null, the top and left of card is set to state.pos instead of note.position[0] & note.position[1]
  onMouseMove(evt) {
    if (!this.state.dragging) return
    let currX = evt.pageX - this.state.rel.x
    let currY = evt.pageY - this.state.rel.y

    var bodyPos = document.body.getBoundingClientRect()
    var whiteboardPos = document.getElementById('mini-whiteboard').getBoundingClientRect()
    var card = document.body.getElementsByClassName('card')[this.state.selectedNote].getBoundingClientRect()

    let valX = currX
    let valY = currY
    let xLeftLimit = whiteboardPos.width + whiteboardPos.left - card.width
    if (currX < whiteboardPos.left) valX = whiteboardPos.left
    else if (currX > xLeftLimit) valX = xLeftLimit

    if (currY < Math.abs(bodyPos.top) + whiteboardPos.top) valY = Math.abs(bodyPos.top) + whiteboardPos.top
    else if (currY > Math.abs(bodyPos.top) + whiteboardPos.top + whiteboardPos.height - card.height) valY = Math.abs(bodyPos.top) + whiteboardPos.top + whiteboardPos.height - card.height

    this.setState({
      pos: {
        x: valX,
        y: valY
      }
    })
    evt.stopPropagation()
    evt.preventDefault()
  }

  render() {
    const { notes, handleRemove } = this.props
    let auth = $('#home-slider')
    let backgrounds = new Array(
    'url(/meeting-02.jpeg)', 'url(/meeting-01.jpg)', 'url(/meeting-03.jpg)', 'url(/meeting-04.jpeg)')

    var current = 0;

    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        auth.css('background-image', `${backgrounds[current]}`)
    }
    setInterval(nextBackground, 10000);

    auth.css('background-image', `${backgrounds[0]}`)

    return (
      <div className="home-whiteboard">
        <div id="home-slider" style={{ height: '100vh', width: '100vw', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center'}}>
          <div className="row">
            <div className="col m6 offset-m3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '70vw', borderRadius: '10px', position: 'absolute', margin: '20% auto' }}>
            <h4 style={{ textAlign: 'center', color: 'black', font: 'Verdana' }}>Collaborative brainstorming couldn't have been easier</h4>
            {/* <button className="waves-effect waves-light btn">Sign Up</button> */}
            </div>
          </div>

          {/* <button className="waves-effect waves-light btn">Sign Up</button> */}
        </div>
        {/* <ReactPlayer
          url="https://www.youtube.com/watch?v=BD1c3XqT4lY"
          playing muted loop
          style={{margin: '0 auto', marginTop: '5vh'}}
          width="1500px"
          height="650px"
          /> */}

        <div className="home-info">
          <div className="details">
            <h5>IdeaStorm: brewing your ideas</h5>
            <span>
            <p>IdeaStorm is a real-time collaborative tool that facilitates team brainstorming</p>
            <p>We have many features available</p>

            <p>Test it out below!</p>
            </span>
          </div>
        </div>

        <div className="children">
          <h3>Interactive Idea Board</h3>
          <p>Test it out! You can do more with these notes when you sign up today!</p>
          <div id="mini-whiteboard">
              { this.notePositions.length > 0 && notes && notes.map(note => { return (
                <div
                  className="card"
                  key={note.id}
                  style = {{position: 'absolute', left: (this.state.selectedNote === note.id && this.state.pos.x) || this.notePositions[note.id][0], top: (this.state.selectedNote === note.id && this.state.pos.y) || this.notePositions[note.id][1], cursor: 'pointer' }}
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
          <div className="fixed-action-btn horizontal click-to-toggle home-toggle">
            <button className="btn-floating btn-large" type="submit" onClick={() => this.setState({ expandToggle: !this.state.expandToggle })}>+</button>
            { this.state.expandToggle &&
              <form onSubmit={ this.handleSubmit }>
                <input name="text" type="text" />
                <button type="submit">Insert</button>
              </form>
            }
          </div>
          </div>
          </div>
          <Footer />
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
    },
    emptyNotes() {
      dispatch(getNotes([]))
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
