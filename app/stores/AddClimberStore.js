import alt from '../alt';
import AddClimberActions from '../actions/AddClimberActions';

class AddClimberStore {
  constructor() {
    this.bindActions(AddClimberActions);
    this.crag = '';
    this.zone = '';
    this.contact = '';
    this.style = '';
    this.helpBlock = '';
    this.cragValidationState = '';
    this.zoneValidationState = '';
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

  onUpdateCrag(event) {
    this.crag = event.target.value;
    this.cragValidationState = '';
  }

  onUpdateZone(event) {
    this.zone = event.target.value;
    this.zoneValidationState = '';
  }

  onUpdateContact(event) {
    this.contact = event.target.value;
    this.contactValidationState = '';
  }

  onUpdateStyle(event) {
    this.style = event.target.value;
    this.styleValidationState = '';
  }

  onInvalidStyle() {
    this.styleValidationState = 'has-error';
  }
}

export default alt.createStore(AddClimberStore);
