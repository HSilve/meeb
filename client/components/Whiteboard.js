/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editNote, fetchNotes, deleteNote, castVote, fetchRoom,
  insertBranch, fetchBranches, getBranches, getNotes,
  updateNoteArray, modifyRoom, announceCollaborator, denounceCollaborator} from '../store'
import { withRouter } from 'react-router'
import ContentEditable from 'react-contenteditable'
import debounce from 'lodash/debounce'
import * as d3 from 'd3'
import VerticalSwimlane from './VerticalSwimlane'

class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      rel: null,
      pos: { x: null, y: null },
      selectedNote: 0,
      show: false,
      connectionArray: [],
      content: {},
      branches: [],
      edit: false
    }
    this.notLoaded = true
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changed = debounce(this.props.editNote, 250)
    this.clickConnection = this.clickConnection.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.showBranches = this.showBranches.bind(this)
  }


  componentDidMount() {
    const boardId = this.props.match.params.id
    this.props.fetchBranches(boardId)
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

  componentWillMount() {
    const boardId = this.props.match.params.id
    this.props.fetchRoom(boardId)
    this.props.fetchNotes(boardId)
    // this.props.announceCollaborator(this.props.userId, boardId);
    // this.props.denounceCollaborator();
  }

  componentWillUnmount() {
    this.props.getBranches([])
    this.props.getNotes([])
    this.props.modifyRoom({...this.props.singleWhiteboard, swimlane: 0,
      categories: Array(0).fill('')})
  }
  //when user clicks mouse down, dragging state is set to true and new relative position
  //is calculated, the position is set to null
  onMouseDown(evt) {
    if (evt.button !== 0) return

    let pos = evt.target.getBoundingClientRect()
    this.setState({
      dragging: true,
      rel: {
        x: evt.pageX - window.scrollX - pos.left,
        y: evt.pageY - window.scrollY - pos.top
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
    if (this.state.pos.x !== null && this.state.pos.y !== null) this.props.editNote(this.state.selectedNote, { position: [this.state.pos.x, this.state.pos.y] })
    evt.stopPropagation()
    evt.preventDefault()
    this.setState({ dragging: false })
  }


  //when state.pos is set to anything but null, the top and left of card is set to state.pos instead of note.position[0] & note.position[1]
  onMouseMove(evt) {
    if (!this.state.dragging) return
    this.setState({
      pos: {
        x: evt.pageX - this.state.rel.x,
        y: evt.pageY - this.state.rel.y
      }
    }, () => {
      console.log(this.props.branches)
      this.props.branches
        .filter(branch => {
          return branch.noteId === this.state.selectedNote || branch.endNoteId === this.state.selectedNote})
        .map(branch => {
          return $(`#line-${branch.id}`).attr({
              x1: window.scrollX + document.getElementById(`connect-${branch.noteId}`).getBoundingClientRect().x,
              y1:  window.scrollY + document.getElementById(`connect-${branch.noteId}`).getBoundingClientRect().y,
              x2: window.scrollX + document.getElementById(`connect-${branch.endNoteId}`).getBoundingClientRect().x,
              y2: window.scrollY + document.getElementById(`connect-${branch.endNoteId}`).getBoundingClientRect().y
          })
        })
    })


    evt.stopPropagation()
    evt.preventDefault()
  }

  handleDelete(evt) {
    evt.preventDefault();
    this.props.deleteNote(evt.target.value, this.props.boardId);
  }

  handleVote(evt) {
    evt.preventDefault();
    evt.target.disabled = true;
    this.props.castVote(evt.target.value);
  }

  handleChange(evt) {
    evt.preventDefault()
    let content = { ...this.state.content }
    content[this.state.selectedNote] = evt.target.value
    this.setState({ content })
    if (evt.target.value !== '') this.changed(this.state.selectedNote, { text: evt.target.value })
  }

  handleConnect(evt, noteId) {
    this.setState({ branches: [...this.state.branches, { noteId, elem: evt.target.getBoundingClientRect()} ] }, function() {
        if (this.state.branches.length >= 2) {
          this.props.insertBranch({noteId: this.state.branches[0].noteId, endNoteId: this.state.branches[1].noteId, whiteboardId: this.props.boardId})
          let newArr = this.state.branches.slice(2)
          this.setState({ branches: newArr })
        }

      })
  }


  showBranches() {
    d3.selectAll('line').remove()
    if (this.props.branches.length >= 1) {
      this.props.branches && this.props.branches.map(branch => {
        if ($(`#connect-${branch.noteId}`).length > 0 && $(`#connect-${branch.endNoteId}`).length > 0) {
          let firstPoints = d3.select(`#connect-${branch.noteId}`).node().getBoundingClientRect()
          let secondPoints = d3.select(`#connect-${branch.endNoteId}`).node().getBoundingClientRect()
          if ($(`#line-${branch.id}`).length <= 0) {
            d3.select('#svg').append('line')
              .attr('x1', window.scrollX + firstPoints.left)
              .attr('y1', window.scrollY + firstPoints.top)
              .attr('x2', window.scrollX + secondPoints.left)
              .attr('y2', window.scrollY + secondPoints.top)
              .attr('stroke-width', 2)
              .attr('stroke', 'black')
              // .attr("position", "absolute")
              .attr('id', `line-${branch.id}`)
          }
        } else {
          setTimeout(this.showBranches, 250)
        }

      })
    }
  }

  clickConnection = (evt, note) => {


//      const { update } = this.props;
//      console.log(`connectionArray: `, update)
//      if (update.indexOf(note.id) === -1) {
//        this.props.updateNoteArray([...update, note.id])
//        let selectedCard = document.getElementById(`card${note.id}`)
//        selectedCard.style.boxShadow = '0 0 20px yellow'
//      } else if (update.indexOf(note.id) !== -1) {
//        let removeNote = update.splice(update.indexOf(note.id), 1)
//        this.props.updateNoteArray(removeNote);
//        let selectedCard = document.getElementById(`card${note.id}`)
//        selectedCard.style.boxShadow = '0 4px 2px -2px gray'
//      }

     const { selectedArray } = this.props;

     if (selectedArray.indexOf(note.id) === -1) {
      //  let tempArr = selectedArray;
      //  tempArr.push(note.id);
      //  this.setState({ connectionArray: tempArr })
      this.props.updateNoteArray(note.id)
       let selectedCard = document.getElementById(`card${note.id}`)
       selectedCard.style.boxShadow = '0 0 20px yellow'
     } else if (selectedArray.indexOf(note.id) !== -1) {
      selectedArray.splice(selectedArray.indexOf(note.id), 1)
       this.setState({ selectedArray })
       let selectedCard = document.getElementById(`card${note.id}`)
       selectedCard.style.boxShadow = '0 4px 2px -2px gray'
     }
    //  this.props.updateNoteArray(selectedArray);
   }

  render() {
    const { userId, hostId } = this.props
    let data = [];
    if (this.props.notes) {
      data = this.props.notes
    }

    let swimlaneArray = []
    const {singleWhiteboard} = this.props
    for (let i = 0; i < singleWhiteboard.swimlane; i++) {
        swimlaneArray.push(<VerticalSwimlane category={singleWhiteboard.categories[i]} index={i} key={i} />)
    }

    return (
      <div>
        <div className="row" style={{ position: 'absolute', width: '100%' }}>
          <div className="col s1 offset s1"></div>
        {
            swimlaneArray ?
              swimlaneArray.map((element) => {
              return element
            }
          )
        : null
      }
      </div>
        <div id="whiteboard">
          <div id="basket" style={{ float: 'right' }}>
            <b>{this.props.name}</b>
          </div>

          {/*  This is for branches */}
          <svg id="svg" height={Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)} width={document.body.getBoundingClientRect().width} >
          </svg>


          {
            data && data.map((note) => {
              {
                return note.position &&
                  (
                    <div
                      className="card"
                      id={`card${note.id}`}
                      key={note.id}
                      style={{
                        position: 'absolute', background: note.color,
                        left: this.state.selectedNote === note.id && this.state.pos.x || note.position[0],
                        top: this.state.selectedNote === note.id && this.state.pos.y || note.position[1],
                        cursor: 'pointer'
                      }}
                    >
                      {this.props.open &&
                        <span>
                          {
                            (note.userId == this.props.userId || this.props.hostId == this.props.userId) &&
                            <button style={{ float: 'left' }} value={note.id} onClick={this.handleDelete}>x</button>
                          }

                          <button
                            onMouseMove={this.onMouseMove}
                            onMouseUp={this.onMouseUp}
                            onMouseDown={(evt) => { this.setState({ selectedNote: note.id }); this.onMouseDown(evt) }}
                            style={{ borderRadius: '25px' }}
                          > ⌖ drag
                        </button>

                          <button value={note.id} onClick={(evt) => { this.clickConnection(evt, note) }}>Select</button>
                          {this.props.vote &&
                            <div style={{ float: 'right' }} >
                              <button value={note.id} onClick={this.handleVote}>⚡️</button>

                            </div>
                          }
                          <button
                            id={`connect-${note.id}`}
                            ref={`connect-${note.id}`}
                            style={{borderRadius: '20px', width: '20px', height: '20px', backgroundColor: 'black'}}
                            onClick={evt => { evt.preventDefault(); this.handleConnect(evt, note.id)}}
                          />
                          {
                            note.votes > 0 && <a style={{ float: 'right' }}>{note.votes}</a>
                          }
                        </span>
                      }
                      {note.text &&
                        <ContentEditable
                          onClick={() => { this.setState({ selectedNote: note.id, pos: { x: null, y: null } }); console.log(this.state.selectedNote) }}
                          className="card-content"
                          html={this.state.content[note.id] || note.text}
                          disabled={(userId !== note.userId && userId !== hostId)}
                          onChange={this.handleChange}
                          contentEditable="plaintext-only"
                        />
                      }

                      {note.image &&
                        <div className="card-image">
                          <img onClick={this.clickImage} src={note.image} style={{ margin: '0 auto'}} />
                        </div>
                      }


                      {note.link &&
                        <div className="card-action">
                          <a type="text/css" target="_blank" href={`http://${note.link}`}>Go Here </a>
                        </div>
                      }

                    </div>

                  )
              }

            })
          }
          {this.props.branches &&
            this.showBranches()
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleWhiteboard: state.singleWhiteboard,
  notes: state.notes,
  boardId: state.singleWhiteboard.id,
  hostId: state.singleWhiteboard.userId,
  userId: state.user.id,
  open: !state.singleWhiteboard.closed,
  vote: state.singleWhiteboard.voteable,
  branches: state.branches,
  name: state.singleWhiteboard.name,
  selectedArray: state.update
})

const mapDispatchToProps = { editNote, fetchNotes, deleteNote, castVote, fetchRoom,
  insertBranch, fetchBranches, getBranches, getNotes, updateNoteArray, modifyRoom, announceCollaborator, denounceCollaborator}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Whiteboard));
