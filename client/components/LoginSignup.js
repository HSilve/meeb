import React from 'react';
import {Login, Signup} from './index';


export default function LoginSignup () {
    $(document).ready(function(){
      $('ul.tabs').tabs()

      let auth = $('#auth')
      let backgrounds = new Array(
      'url(/meeting-02.jpeg)', 'url(/meeting-01.jpg)', 'url(/meeting-03.jpg)', 'url(/meeting-04.jpeg)')

      var current = 0;

      function nextBackground() {
          current++;
          current = current % backgrounds.length;
          auth.css('background-image', `linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.2)), ${backgrounds[current]}`)
      }
      setInterval(nextBackground, 10000);

      auth.css('background-image', `linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.2)), ${backgrounds[0]}`)
    });



    return (
      <div id="auth">
        <div className="row">
          <br />
          <div className="col s12 m4 offset-m4 auth-edges">
            <ul className="tabs">
              <li className="tab col s3"><a className="active" href="#test1">Login</a></li>
              <li className="tab col s3"><a  href="#test2">Signup</a></li>
            </ul>
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
