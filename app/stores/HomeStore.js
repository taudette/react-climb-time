import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.climbers = [];
  }

  onGetClimbersSuccess(data) {
    this.climbers = data;
  }

  onFilterClimbers(event) {
    let climbers = this.climbers;
    climbers = climbers.filter(function(climber) {
      return climber.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.climbers = climbers;
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
}

export default alt.createStore(HomeStore);