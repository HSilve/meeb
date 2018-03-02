import React, {Component} from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class GroupAdmin extends Component() {
  render () {
    return (
      <div>
        <div className = "row">
          <div className="col s12">{this.props.group.name}</div>
        </div>
        <div className = "row">
          <div className="col s6">
          <table>
            <thead>
              <tr><td> Members</td></tr>
            </thead>
            <tbody>
            {
              this.props.groupMembers.map(person =>
                (
                <tr key={person.id}>
                  <td> X </td>
                  <td>{person.name}</td>
                  <td className="switch">
                    <div>
                      <label>
                        Member
                        {
                          person.id != this.props.userId ?
                          <input type="checkbox" />
                          :
                          <input disabled type="checkbox" />

                        }
                        <span className="lever" />
                        Admin
                      </label>
                    </div>
                  </td>
                </tr>
                )
              )
            }
            </tbody>
          </table>
          </div>
          <div className="col s6">
            Group Whiteboards
          </div>
        </div>
      </div>
    )
  }

}

const mapState = (state) => ({
  user: this.state.user.id
})
const mapDispatch = {}

export default connect(mapState, mapDispatch)(GroupAdmin)

