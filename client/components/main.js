import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, isLoggedIn, handleClick } = props

  return (
    <div>
      <nav className="nav">
        <div className="nav-wrapper">
          <Link to="/home" className="brand-logo"><img className="icon" src="/favicon.ico" /></Link>
          {isLoggedIn ?
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/home"> Main </Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><a href="#" onClick={handleClick}>Logout</a></li>
            </ul>
            :
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/home"> Main </Link></li>
              <li><Link to="/login">Login / Signup</Link></li>
            </ul>
          }
        </div>
      </nav>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
