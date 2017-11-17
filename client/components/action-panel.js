import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindAll } from 'lodash';

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
    bindAll(this, 'toggle', 'handleSubmit')
  }

  toggle(type) {
    if (type === 'expand') this.setState({ expandToggle: !this.state.expandToggle })

    else if (type === 'text') this.setState({ textToggle: !this.state.textToggle })

    else if (type === 'image') this.setState({ imageToggle: !this.state.imageToggle })

    else if (type === 'link') this.setState({ linkToggle: !this.state.linkToggle })

    else this.setState({ drawToggle: !this.state.drawToggle })
  }

  handleSubmit(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div className="fixed-action-btn">
        <button type="submit" onClick={() => this.toggle('expand')}>+</button>
        {this.state.expandToggle &&
          <span>
            <div onClick={() => this.toggle('text')}>Text</div>
            <div onClick={() => this.toggle('image')}>Image</div>
            <div onClick={() => this.toggle('link')}>Link</div>
            <div>Draw</div>
          </span>
        }

        <div>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {(this.state.textToggle || this.state.linkToggle) && <input name="text" type="text" />}
            {this.state.imageToggle &&
              <div>
                <input name="file" type="file" />
              </div>
            }
            <button type="submit">Insert</button>
          </form>
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
