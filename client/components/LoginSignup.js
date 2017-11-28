import React from 'react';
import {Login, Signup} from './index';


export default function LoginSignup () {
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });

    return (
      <div className="auth">
        <div className="row">
          <br />
          <div className="col s6">
            <ul className="tabs">
              <li className="tab col s3"><a className="active" href="#test1">Login</a></li>
              <li className="tab col s3"><a  href="#test2">Signup</a></li>
            </ul>
          </div>
        </div>
          <div className="row">
          <div className="col s6">
          <div id="test1" className="">
            <Login />
          </div>
          <div id="test2" className="">
            <Signup />
          </div>
          </div>
        </div>
      </div>
    )
}
