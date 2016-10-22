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
    ClimbersActions.getClimberCount();
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
      // optional parameters
      let picture;
      if (climber.picture) {
        picture = (
          <li><img src={climber.picture} alt="profile-picture" width={150} height={150} /></li>
        );
      }
      let contact;
      if (climber.contact) {
        contact = (
          <li><strong>Contact:</strong> {climber.contact}</li>
        );
      }
      let crag;
      if (climber.crag) {
        crag = (
          <li><strong>Crag:</strong> {climber.crag}</li>
        );
      }

      return (
        <li key={climber.name} >
          <div className='thumbnail fadeInUp animated'>
            <div className='caption text-center'>
              <h4><strong>{climber.name}</strong></h4>
              <ul>
                {picture}
                <li><strong>State:</strong> {climber.zone}</li>
                {crag}
                {contact}
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
          <div className="input-group">
            <input type="text" className="form-control" placeholder={this.state.totalClimbers + ' climbers'} onChange={this.filterClimbers} />
            <span className="input-group-addon" id="basic-addon2"><span className='glyphicon glyphicon-search'></span></span>
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