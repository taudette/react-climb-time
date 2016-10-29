import alt from '../alt';

class ClimbersActions {
  constructor() {
    this.generateActions(
      'getClimbersSuccess',
      'getClimbersFail',
      'deleteClimberSuccess',
      'deleteClimberFail',
      'filterClimbers',
      'updateZone',
      'getClimberCountSuccess',
      'getClimberCountFail',
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

  getClimberCount() {
    $.ajax({ url: '/api/climbers/count' })
      .done((data) => {
        this.actions.getClimberCountSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getClimberCountFail(jqXhr);
      });
  }

  filterClimbers(event) {
    this.actions.filterClimbers(event.target.value);
  }

  updateZone(event) {
    this.actions.updateZone(event.target.value);
  }
}

export default alt.createActions(ClimbersActions);