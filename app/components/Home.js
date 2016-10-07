import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getClimbers();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  deleteClimber(climber){
    HomeActions.deleteClimber(climber.name);
  }

  render() {
    var climberNodes = this.state.climbers.map((climber, index) => {
      return (
        <div key={climber.name} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong>Style:</strong> {climber.style}</li>
              </ul>
              <h4>
                <Link to={'/climbers/' + climber.climberId}><strong>{climber.name}</strong></Link>
              </h4>
              <button onClick={this.deleteClimber.bind(this, climber)}>Delete</button>   
            </div>
          </div>
        </div>
      );   
    });

    return (
      <div className='container'>
        <div className='row'>
          {climberNodes}
        </div>
      </div>
    );
  }
}

export default Home;