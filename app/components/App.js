import React, { PropTypes as T } from 'react';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    let children = null;

    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, // sends auth instance from route to children
      });
    }

    return (
      <div>
        <Navbar history={this.props.history} />
        {children}
      </div>
    );
  }
}

export default App;