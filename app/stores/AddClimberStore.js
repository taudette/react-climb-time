import alt from '../alt';
import AddClimberActions from '../actions/AddClimberActions';

class AddClimberStore {
  constructor() {
    this.bindActions(AddClimberActions);
    this.name = '';
    this.crag = '';
    this.contact = '';
    this.style = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.cragValidationState = '';
    this.contactValidationState = '';
    this.styleValidationState = '';
  }

  onAddClimberSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddClimberFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateCrag(event) {
    this.crag = event.target.value;
    this.cragValidationState = '';
  }

  onUpdateContact(event) {
    this.contact = event.target.value;
    this.contactValidationState = '';
  }

  onUpdateStyle(event) {
    this.style = event.target.value;
    this.styleValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a climber name.';
  }

  onInvalidStyle() {
    this.styleValidationState = 'has-error';
  }
}

export default alt.createStore(AddClimberStore);
