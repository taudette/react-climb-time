import alt from '../alt';

class AddClimberActions {
  constructor() {
    this.generateActions(
      'addClimberSuccess',
      'addClimberFail',
      'updateName',
      'updateCrag',
      'updateContact',
      'updateStyle',
      'invalidName',
      'invalidStyle'
    );
  }

  addClimber(name, crag, contact, style) {
    $.ajax({
      type: 'POST',
      url: '/api/climbers',
      data: { name: name, crag: crag, contact: contact, style: style },
    })
      .done((data) => {
        const message = data[data.length - 1].name + ' has been added';
        this.actions.addClimberSuccess(message);
      })
      .fail(() => {
        const message = 'Climber has not been added';
        this.actions.addClimberFail(message);
      });
  }
}

export default alt.createActions(AddClimberActions);