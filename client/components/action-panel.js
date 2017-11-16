import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class ActionPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      inputToggle: false,
      textToggle: false,
      imageToggle: false,
      linkToggle: false,
      drawToggle: false
    }
  }

  toggle (type) {
    if (type === 'expand') this.setState({ inputToggle: !this.setState.inputToggle })

    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })

    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })

    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })

    else this.setState({ drawToggle: !this.state.drawToggle })
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.state.toggle('expand')}>+</button>
        { this.state.expandToggle &&
           <span>
             <div onClick={() => this.state.toggle('text')}>Text</div>
             <div>Image</div>
             <div>Link</div>
             <div>Draw</div>
           </span>
        }

        <div>
          { (this.state.textToggle || this.state.linkToggle) && <input type="text" /> }

          { this.state.imageToggle &&
          <}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(ActionPanel)
