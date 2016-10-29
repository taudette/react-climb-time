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
         <form>
            <div className ={'form-group ' + this.state.zoneValidationState}>
              <label htmlFor="state" className="control-label">State</label>
              <div>
                <select className="form-control" id="state" value={this.state.zone} name="state" onChange={ClimbersActions.updateZone}>
                  <option value="">N/A</option>
                  <option value="AK">Alaska</option>
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DC">District of Columbia</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="IA">Iowa</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MD">Maryland</option>
                  <option value="ME">Maine</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MO">Missouri</option>
                  <option value="MS">Mississippi</option>
                  <option value="MT">Montana</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="NE">Nebraska</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NV">Nevada</option>
                  <option value="NY">New York</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VA">Virginia</option>
                  <option value="VT">Vermont</option>
                  <option value="WA">Washington</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WV">West Virginia</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
            </div>
          </form>
          <div className="input-group">
            <input type="text" className="form-control" placeholder={this.state.totalClimbers + ' climbers: Search by state, style, or crag'} onChange={this.filterClimbers} />
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