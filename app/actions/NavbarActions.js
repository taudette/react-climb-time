import alt from '../alt';
import {assign} from 'underscore';

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

  findClimber(payload) {
    $.ajax({
      url: '/api/climber/search',
      data: { name: payload.searchQuery },
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findClimberSuccess(payload);
      })
      .fail(() => {
        this.actions.findClimberFail(payload);
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