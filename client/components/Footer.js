import React from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'


const Footer = (props) => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">IdeaStorm</h5>
            <p className="grey-text text-lighten-4">A real-time collaboration tool that facilitates brainstorming sessions</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Find us on LinkedIn</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/mariabetances/">Maria Betances</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/ericachai/">Erica Chai</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/evlis-henry/">Evlis Henry</a></li>
              <li><a className="grey-text text-lighten-3" href="https://www.linkedin.com/in/blancasprofile/">Blanca Sanchez</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2017 Made by Maria Betances, Erica Chai, Evlis Henry, Blanca Sanchez
        <a className="grey-text text-lighten-4 right" href="https://github.com/EHenry92/meeb">Github Repo</a>
        </div>
      </div>
    </footer>
  )
}


const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(Footer))
