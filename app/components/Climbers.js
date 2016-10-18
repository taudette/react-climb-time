import React from 'react';
import {Link} from 'react-router';
import ClimbersStore from '../stores/ClimbersStore';
import ClimbersActions from '../actions/ClimbersActions';
import { first, without, findWhere } from 'underscore';

class Climbers extends React.Component {

  constructor(props) {
    super(props);
    this.state = ClimbersStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ClimbersStore.listen(this.onChange);
    ClimbersActions.getClimbers();
  }

  componentWillUnmount() {
    ClimbersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  deleteClimber(climber) {
    ClimbersActions.deleteClimber(climber.name);
  }

  filterClimbers(event) {
    ClimbersActions.filterClimbers(event);
  }

  render() {
    var climberNodes = this.state.climbers.map((climber) => {
      return (
        <li>
          <div className='thumbnail fadeInUp animated'>
            <div className='caption text-center'>
            <h4><strong>{climber.name}</strong></h4>
              <ul className='list-inline'>
                <li><strong>Crag:</strong> {climber.crag}</li>
              </ul>
              <ul className='list-inline'>
                <li><strong>Contact:</strong> {climber.contact}</li>
              </ul>
              <ul className='list-inline'>
                <li><strong>Style:</strong> {climber.style}</li>
              </ul>
              <button onClick={this.deleteClimber.bind(this, climber)}>Delete</button>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className="filter-list">
            <input type="text" placeholder="Search" onChange={this.filterClimbers} />
          </div>
          <ul className='col-md-3'>
           {climberNodes}
          </ul>
        </div>
      </div>
    );
  }
}

export default Climbers;