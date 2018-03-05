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
      selectedNote: -1,
      scrollPos: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.emptyNotes()
    window.addEventListener('scroll', this.handleScroll)
    const demoBoard = ['Click on the bottom right toggle and input text', 'Submit and note will appear on whiteboard', 'You can drag the card around. Sign up to unlock more features']
    demoBoard.forEach(text => {
      let bodyPos = document.body.getBoundingClientRect()
      let whiteboardPos = document.getElementById('mini-whiteboard').getBoundingClientRect()
      this.notePositions[++this.noteId] = [this.noteId * 500 + 50, Math.abs(bodyPos.top) + whiteboardPos.top + 100]
      this.props.createNote({ id: this.noteId, text, position: this.notePositions[this.noteId] })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

  handleScroll() {
    const intro = document.getElementById('intro')
    let prevScrollPos = this.state.scrollPos
    let introPos = intro.getBoundingClientRect()
    if (introPos.top < 25 && introPos.top > 5 && prevScrollPos < window.scrollY) {
      window.scrollTo(0, 108)
    } else if (introPos.height - introPos.bottom > 600 && (prevScrollPos < window.scrollY) && introPos.height - introPos.bottom < 620) {
      window.scrollTo(0, introPos.height + 108)
    }
    this.setState({ scrollPos: window.scrollY })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let bodyPos = document.body.getBoundingClientRect()
    let whiteboardPos = document.getElementById('mini-whiteboard').getBoundingClientRect()
    this.notePositions[++this.noteId] = [680, Math.abs(bodyPos.top) + whiteboardPos.top]
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

    return (
      <div className="home-whiteboard">

        <div className="intro" id="intro">
          <span>
          <h3>Collaborative brainstorming?</h3>
          <h3>All you need is our virtual whiteboard.</h3>
          <p>Test it out with our demo below</p>
          </span>
        </div>

        <div className="mini-whiteboard" id="mini-whiteboard">
          { this.notePositions.length > 0 && notes && notes.map(note => (
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

        <div className="features">
          <span>
          <h4>Key Features</h4>
          <div className="row">
            <div className="col s4">
              <div className="material-icons">add_a_photo</div>
              <p>Insert an image to your note</p>
            </div>
            <div className="col s4">
              <div className="material-icons">insert_link</div>
              <p>Share a link</p>
            </div>
            <div className="col s4">
              <div className="material-icons">device_hub</div>
              <p>Connect notes with branches</p>
            </div>
          </div>

          <div className="row">
            <div className="col s4">
              <div className="material-icons">flash_on</div>
              <p>Vote on an idea</p>
            </div>
            <div className="col s4">
              <div className="material-icons">view_column</div>
              <p>Use swimlanes to organize ideas</p>
            </div>
            <div className="col s4">
              <div className="material-icons">edit</div>
              <p>Edit and create in real-time</p>
            </div>
          </div>
          </span>
        </div>

        <div className="take-actions">
          <span>
            <button>Sign Up Today</button>
            <button>Log In</button>
          </span>
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
