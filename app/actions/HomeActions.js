import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getClimbersSuccess',
      'getClimbersFail'
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
        this.actions.getClimbersFail(jqXhr.responseJSON.message);
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
        this.actions.deleteClimbersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.deleteClimbersFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);