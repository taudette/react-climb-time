import React from 'react';
import AddClimberStore from '../stores/AddClimberStore';
import AddClimberActions from '../actions/AddClimberActions';
import { Link } from 'react-router';

class AddClimber extends React.Component {

  constructor(props) {
    super(props);
    this.state = AddClimberStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddClimberStore.listen(this.onChange);
    this.state.name = window.localStorage.profile.name;
    const user = JSON.parse(window.localStorage.profile);
    this.state.name = user.name;
    this.state.picture = user.picture_large;
  }

  onChange(state) {
    this.setState(state);
  }

  componentWillUnMount() {
    AddClimberStore.unlisten(this.onChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    var user = {
      name: this.state.name,
      crag: this.state.crag,
      zone: this.state.zone,
      contact: this.state.contact,
      style: this.state.style,
      picture: this.state.picture,
    };

    if (user.name && user.crag && user.contact && user.style) {
      AddClimberActions.addClimber(user);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Post Climbing Request</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <span className='help-block'>{this.state.helpBlock}</span>
                  <div className ={'form-group ' + this.state.zoneValidationState}>
                    <label htmlFor="state" className="control-label">State</label>
                    <div>
                      <select className="form-control" id="state" value={this.state.zone} name="state" onChange={AddClimberActions.updateZone}>
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
                  <div className={'form-group ' + this.state.cragValidationState}>
                    <label className='control-label'>Crag</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.crag}
                      onChange={AddClimberActions.updateCrag} autoFocus
                    />
                  </div>
                  <div className={'form-group ' + this.state.contactValidationState}>
                    <label className='control-label'>Contact (leave blank if you want to communicate only through climb time)</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.contact}
                      onChange={AddClimberActions.updateContact} autoFocus
                    />
                  </div>
                  <div className={'form-group ' + this.state.styleValidationState}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='style' id='sport' value='Sport' checked={this.state.style === 'Sport'}
                        onChange={AddClimberActions.updateStyle}
                      />
                      <label htmlFor='sport'>Sport</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='style' id='boulder' value='Boulder' checked={this.state.style === 'Boulder'}
                        onChange={AddClimberActions.updateStyle}
                      />
                      <label htmlFor='boulder'>Boulder</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='style' id='trad' value='Trad' checked={this.state.style === 'Trad'}
                        onChange={AddClimberActions.updateStyle}
                      />
                      <label htmlFor='trad'>Trad</label>
                    </div>
                     <div className='radio radio-inline'>
                      <input type='radio' name='style' id='any' value='Any' checked={this.state.style === 'Any'}
                        onChange={AddClimberActions.updateStyle}
                      />
                      <label htmlFor='any'>Any</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddClimber;
