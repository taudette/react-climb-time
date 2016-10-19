import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService';


class Login extends React.Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <div>
          <button onClick={auth.login.bind(this)}>Login</button>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: T.object,
 };

Login.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService),
};

export default Login;