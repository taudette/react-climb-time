import alt from '../alt';
import ClimbersActions from '../actions/ClimbersActions';

class ClimbersStore {
  constructor() {
    this.bindActions(ClimbersActions);
    this.climbers = [];
    this.allClimbers = [];
    this.totalClimbers = 0;
  }

  onGetClimbersSuccess(data) {
    this.climbers = data;
    this.allClimbers = data;
  }

  onFilterClimbers(event) {
    const climbers = this.allClimbers;
    const filteredClimbers = climbers.filter(climber => 
      climber.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    );
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