import { decorateCooked } from 'discourse/lib/plugin-api';

export default {
  name: "suttacentral",
  initialize: function(container) {
      
    decorateCooked(container, function($elem) {
      $elem.scUids()
    });
  }
};
