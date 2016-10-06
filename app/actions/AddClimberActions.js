import alt from '../alt';

class AddClimberActions {
  constructor() {
    this.generateActions(
      'addClimberSuccess',
      'addClimberFail',
      'updateName',
      'updateStyle',
      'invalidName',
      'invalidStyle'
    );
  }

  addClimber(name, style) {
    $.ajax({
      type: 'POST',
      url: '/api/climbers',
      data: { name: name, style: style }
    })
      .done((data) => {
        this.actions.addClimberSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addClimberFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddClimberActions);