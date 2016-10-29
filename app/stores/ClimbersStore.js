import alt from '../alt';
import ClimbersActions from '../actions/ClimbersActions';

class ClimbersStore {
  constructor() {
    this.bindActions(ClimbersActions);
    this.climbers = [];
    this.allClimbers = [];
    this.totalClimbers = 0;
    this.zoneValidationState = '';
  }

  onGetClimbersSuccess(data) {
    this.climbers = data;
    this.allClimbers = data;
  }

  onUpdateZone(event) {
    const climbers = this.allClimbers;
    const filteredStates = climbers.filter(climber =>
      climber.zone.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    );

    this.climbers = filteredStates;
  }

  onFilterClimbers(event) {
    const climbers = this.allClimbers;
    // TODO: combine into 1 function
    const filteredNames = climbers.filter(climber =>
      climber.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    );
    const filteredStyles = climbers.filter(climber =>
      climber.style.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    );
    const filteredCrags = climbers.filter(climber =>
      climber.crag.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    );
    const filteredClimbers = filteredNames.concat(filteredCrags, filteredStyles);

    this.climbers = filteredClimbers;
  }

  onGetClimbersFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onDeleteClimberSuccess(data) {
    this.climbers = data;
  }

  onDeleteClimberFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onGetClimberCountSuccess(data) {
    this.totalClimbers = data.count;
  }
}

export default alt.createStore(ClimbersStore);