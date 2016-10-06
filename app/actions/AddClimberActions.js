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
        var message = data[data.length-1].name + ' has been added';
        this.actions.addClimberSuccess(message);
      })
      .fail((jqXhr) => {
        var message = data[data.length-1].name + ' has not been added';
        this.actions.addClimberFail(message);
      });
  }
}

export default alt.createActions(AddClimberActions);