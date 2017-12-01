/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class VoteResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  makeRectangles(amount) {
    let array = [];
    for (var i = 0; i < amount; i++) {
      array.push(
        <i key={i} className="material-icons" style={{ float: 'left' }}>flash_on</i>
      )
    }
    return array;
  }
  render() {
    return (
      <div>
        {
          this.props.notes.map(note => {
            if (note.votes !== 0) {
              return (
                <div key={note.id} className="row" >
                  <div className="col s3">{note.text}</div>
                  <div>{this.makeRectangles(note.votes)}</div>
                </div>

              )
            }
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(VoteResults);

