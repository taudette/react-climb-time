import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import { first, without, findWhere } from 'underscore';
import { FacebookLogin } from 'react-facebook-login-component';

class Home extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseFacebook (response) {
    console.log(response);
    // anything else you want to do(save to localStorage)... 
  }
 
  render() {
    return (
      <div className='container'>
        <h1> Welcome to Climb Time </h1>
        <div>
          <FacebookLogin socialId="1247317688671713"
                         language="en_US"
                         scope="public_profile,email"
                         responseHandler={this.responseFacebook}
                         xfbml={true}
                         version="v2.5"
                         class="facebook-login"
                         buttonText="Login With Facebook" />
        </div>
      </div>
    );
  }
 
}
 
export default Home;