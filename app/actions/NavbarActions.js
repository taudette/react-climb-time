import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getClimberCountSuccess',
      'getClimberCountFail',
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

  getClimberCount() {
    $.ajax({ url: '/api/climbers/count' })
      .done((data) => {
        this.actions.getClimberCountSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getClimberCountFail(jqXhr);
      });
  }
}

export default alt.createActions(NavbarActions);