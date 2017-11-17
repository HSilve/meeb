import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNote } from '../store'

class ActionPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      expandToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false,
      file: {}
    }
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  toggle (type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })
    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })
    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })
    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })
    else this.setState({ drawToggle: !this.state.drawToggle })
  }

  handleFileUpload(evt) {
    evt.preventDefault()

    // console.log(evt.target.files)
    // const image = new FormData()
    // image.append('file', evt.target.files[0])
    console.log(evt.target.files[0])
    this.setState({ file: evt.target.files[0]})
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.toggle('expand')}>+</button>
        { this.state.expandToggle &&
           <span>
             <div onClick={() => this.toggle('text')}>Text</div>
             <div onClick={() => this.toggle('image')}>Image</div>
             <div onClick={() => this.toggle('link')}>Link</div>
             <div>Draw</div>
            <form onSubmit={(evt) => {evt.preventDefault(); this.props.handleSubmit(evt, this.state.file )} } encType="multipart/form-data" >
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
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, image) {
      evt.preventDefault()
      const text = evt.target.text && evt.target.text.value
      const link = evt.target.link && evt.target.link.value
      const whiteboardId = 1
      dispatch(addNote({ image, text, link, whiteboardId }))
    }
  }
}

export default connect(mapState, mapDispatch)(ActionPanel)
