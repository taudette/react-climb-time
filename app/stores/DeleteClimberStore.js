import alt from '../alt';
import DeleteClimberActions from '../actions/DeleteClimberActions';

class DeleteClimberStore {
  constructor() {
    this.bindActions(DeleteClimberActions);
    this.name = '';
    this.style = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.styleValidationState = '';
  }

  onDeleteClimberSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onDeleteClimberFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
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

export default alt.createStore(DeleteClimberStore);
