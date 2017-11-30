import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Home, ConferenceRoom, Profile, LoginSignup } from './components'
import { me } from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch id="switchSpace">
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={LoginSignup} />
            <Route exact path="/" component={Home} />

            {
              isLoggedIn &&
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/whiteboards/:id" component={ConferenceRoom} />
                <Route exact path="/profile" component={Profile} />
                <Redirect to="/" />
              </Switch>
            }
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
