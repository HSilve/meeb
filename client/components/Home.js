import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = (props) => {
  // const { } = props

  return (
    <div>
      <div className="children">
        <h1>HOME</h1>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = null


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
}
