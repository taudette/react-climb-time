import alt from '../alt';

class DeleteClimberActions {
  constructor() {
    this.generateActions(
      'DeleteClimberSuccess',
      'DeleteClimberFail',
      'updateName',
      'updateStyle',
      'invalidName',
      'invalidStyle'
    );
  }

  deleteClimber(name, style) {
    $.ajax({
      type: 'DELETE',
      url: '/api/climbers',
      data: { name: name, style: style }
    })
      .done((data) => {
        var message = data[data.length-1].name + ' has been deleted';
        this.actions.deleteClimberSuccess(message);
      })
      .fail((jqXhr) => {
        var message = data[data.length-1].name + ' has not been deleted';
        this.actions.deleteClimberFail(message);
      });
  }
}

export default alt.createActions(DeleteClimberActions);