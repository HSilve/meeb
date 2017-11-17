import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addNote } from './store'

class ActionPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      expandToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false
    }
  }

  toggle (type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })
    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })
    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })
    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })
    else this.setState({ drawToggle: !this.state.drawToggle })
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
            <form onSubmit={this.props.handleSubmit} encType="multipart/form-data" >
            { (this.state.textToggle || this.state.linkToggle) && <input name="text" type="text" /> }
            { this.state.imageToggle &&
              <div>
                <input name="file" type="file" />
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const image = evt.target.file.value
      const text = evt.target.text.value
      const link = evt.target.link.value

      const whiteboardId = ownProps.match.params.whiteboardId
      dispatch(addNote({ image, text, link }, whiteboardId))
    }
  }
}

export default connect(mapState, mapDispatch)(ActionPanel)
