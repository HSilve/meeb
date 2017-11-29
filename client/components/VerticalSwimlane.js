import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { fetchRoom, modifyRoom } from '../store'

class VerticalSwimlane extends Component{
  constructor(props){
    super(props)
    this.state = {
      value: this.props.category,
      active: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    let {id} = this.props.match.params
    this.props.fetchRoom(id)
  }

  onChange(evt){
    this.setState({value: evt.target.value, active: true})
  }

  onSubmit(evt){
    evt.preventDefault()
    this.setState({active: false})
    let room = {}
    room = {...this.props.singleWhiteboard}
    room.categories[this.props.index] = this.state.value
    this.props.modifyRoom(room)
  }

  render(){
    let text= ''
    return(
      <div>
        <div className="row">
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s1"></div>
          <div className="col s12">
            <div className="card-panel teal lighten-5" id="categoryName">
              <form onSubmit={(evt) => this.onSubmit(evt)}>
                <input type="text" className="center-align"
                  value={this.state.value}
                  placeholder={this.props.category}
                  onChange={(evt) => {
                    this.onChange(evt)
                    }
                  }
                />
              {
                this.state.active &&
                <button>submit</button>
              }
            </form>
            <div>
            </div>
            </div>
            <svg className="verticalSwimlane">
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ singleWhiteboard }) => ({ singleWhiteboard })
const mapDispatch = { fetchRoom, modifyRoom }

export default withRouter(connect(mapState, mapDispatch)(VerticalSwimlane))
