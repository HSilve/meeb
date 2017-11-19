import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNote } from '../store'
import history from '../history'

class ActionPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      expandToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false,
      file: [],
      name: ''
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  toggle(type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })
    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })
    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })
    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })
    else this.setState({ drawToggle: !this.state.drawToggle })
  }

  handleFileUpload(evt) {
    evt.preventDefault()
    let reader = new FileReader();
    let imageFile = evt.target.files[0]
    reader.readAsDataURL(evt.target.files[0])
    reader.onloadend = () => {
      this.setState({
        file: reader.result,
        name: imageFile.name,
        type: imageFile.type
      })
    }


  }

  render() {
    console.log(history)
    return (
      <div className="fixed-action-btn">
        <button type="submit" onClick={() => this.toggle('expand')}>+</button>
        { this.state.expandToggle &&
           <span>
             <div onClick={() => this.toggle('text')}>Text</div>
             <div onClick={() => this.toggle('image')}>Image</div>
             <div onClick={() => this.toggle('link')}>Link</div>
             <div>Draw</div>
            <form onSubmit={(evt) => {evt.preventDefault(); this.props.handleSubmit(evt, this.state.file, this.state.name, this.state.type, this.props.user.id, this.props.whiteboard )} } >
            { (this.state.textToggle || this.state.linkToggle) && <input name="text" type="text" /> }
            { this.state.imageToggle &&
              <div>
                <input name="file" type="file" onChange={this.handleFileUpload} />
              </div>
            }
            <button type="submit">Insert</button>
            </form>
          </span>
        }
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    user: state.user,
    whiteboard: state.whiteboard.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit (evt, file, imageName, fileType, userId, whiteboardId) {
      evt.preventDefault()
      whiteboardId = whiteboardId.toString()
      userId = userId.toString()
      const text = evt.target.text && evt.target.text.value
      const link = evt.target.link && evt.target.link.value

      //ONLY WORKS IF USER IS LOGGED IN FIRST
      dispatch(addNote({ file, imageName, fileType, text, link, whiteboardId, userId }))
    }
  }
}

export default connect(mapState, mapDispatch)(ActionPanel)
