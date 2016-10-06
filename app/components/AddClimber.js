import React from 'react';
import AddClimberStore from '../stores/AddClimberStore';
import AddClimberActions from '../actions/AddClimberActions';

class AddClimber extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddClimberStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddClimberStore.listen(this.onChange);
  }

  componentWillUnMount() {
    AddClimberStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim();
    const style = this.state.style;

    if (!name) {
      AddClimberActions.invalidName();
      this.refs.nameTextField.getDomNode().focus();
    }

    if (name && style) {
      AddClimberActions.addClimber(name, style);
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
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Climber Name</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                      onChange={AddClimberActions.updateName} autoFocus 
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
