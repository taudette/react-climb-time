import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getClimbersSuccess',
      'getClimbersFail',
      'deleteClimberSuccess',
      'deleteClimberFail'
    );
  }

  getClimbers() {
    $.ajax({ 
      url:'/api/climbers',
      type: 'GET',
      dataType: 'json',
      })
      .done(data => {
        this.actions.getClimbersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getClimbersFail('faied');
      });
  }

  deleteClimber(name) {
    console.log(name)
    $.ajax({ 
      url:'/api/climbers',
      type: 'DELETE',
      dataType: 'json',
      data: { name: name }
      })
      .done(data => {
        console.log('done')
        this.actions.deleteClimberSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.deleteClimberFail('fail');
      });
  }
}

export default alt.createActions(HomeActions);