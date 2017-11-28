import React from 'react';
import {Login, Signup} from './index';


export default function LoginSignup () {
    $(document).ready(function(){
      $('ul.tabs').tabs()

      let auth = $('#auth')
      let backgrounds = new Array(
      'url(/meeting-02.jpeg)', 'url(/meeting-01.jpg)', 'url(http://placekitten.com/300)', 'url(http://placekitten.com/400)')

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
          <div className="col s12 m6 offset-m3">
            <ul className="tabs auth-edges">
              <li className="tab col s3"><a className="active" href="#test1">Login</a></li>
              <li className="tab col s3"><a  href="#test2">Signup</a></li>
            </ul>
          </div>
        </div>
          <div className="row">
          <div className="col s12 m6 offset-m3">
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
