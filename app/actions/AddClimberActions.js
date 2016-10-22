import alt from '../alt';

class AddClimberActions {
  constructor() {
    this.generateActions(
      'addClimberSuccess',
      'addClimberFail',
      'updateName',
      'updateZone',
      'updateCrag',
      'updateContact',
      'updateStyle',
      'updatePicture',
      'invalidName',
      'invalidStyle'
    );
  }

  addClimber(user) {
    $.ajax({
      type: 'POST',
      url: '/api/climbers',
      data: {
        name: user.name,
        zone: user.zone,
        crag: user.crag,
        contact: user.contact,
        style: user.style,
        picture: user.picture,
      },
    })
      .done((data) => {
        const message = data[data.length - 1].name + ' has been added';
        this.actions.addClimberSuccess(message);

        // setTimeout(() => {
        //   window.location.href = '/climbers';
        // }, 500);
      })
      .fail(() => {
        const message = 'Climber has not been added';
        this.actions.addClimberFail(message);
      });
  }
}

export default alt.createActions(AddClimberActions);