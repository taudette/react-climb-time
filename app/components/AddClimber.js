import React from 'react';
import AddClimberStore from '../stores/AddClimberStore';
import AddClimberActions from '../actions/AddClimberActions';
import {Link} from 'react-router';

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
              <div className='panel-heading'>Add Climber</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.cragValidationState}>
                    <label className='control-label'>Crag</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.crag}
                      onChange={AddClimberActions.updateCrag} autoFocus
                    />
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.contactValidationState}>
                    <label className='control-label'>Contact</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.contact}
                      onChange={AddClimberActions.updateContact} autoFocus
                    />
                    <span className='help-block'>{this.state.helpBlock}</span>
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
