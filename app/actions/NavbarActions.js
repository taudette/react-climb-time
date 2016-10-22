import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'findClimberSuccess',
      'findClimberFail'
    );
  }

  findClimber(searchQuery) {
    $.ajax({
      type: 'GET',
      url: '/api/climbers/search',
      data: searchQuery,
    })
      .done((data) => {
        console.log(data);
        this.actions.findClimberSuccess(data);
      })
      .fail(() => {
        this.actions.findClimberFail('failed');
      });
  }
}

export default alt.createActions(NavbarActions);