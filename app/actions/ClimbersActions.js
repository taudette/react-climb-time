import alt from '../alt';

class ClimbersActions {
  constructor() {
    this.generateActions(
      'getClimbersSuccess',
      'getClimbersFail',
      'deleteClimberSuccess',
      'deleteClimberFail',
      'filterClimbers',
    );
  }

  getClimbers() {
    $.ajax({ 
      url: '/api/climbers',
      type: 'GET',
      dataType: 'json',
    })
      .done(data => {
        this.actions.getClimbersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getClimbersFail('failed');
      });
  }

  deleteClimber(name) {
    $.ajax({ 
      url: '/api/climbers',
      type: 'DELETE',
      dataType: 'json',
      data: { name: name },
    })
      .done(data => {
        console.log('done')
        this.actions.deleteClimberSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.deleteClimberFail('fail');
      });
  }

  filterClimbers(event) {
    this.actions.filterClimbers(event.target.value);
  }
}

export default alt.createActions(ClimbersActions);