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