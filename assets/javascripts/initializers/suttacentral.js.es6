import { decorateCooked } from 'discourse/lib/plugin-api';



export default {
  name: "suttacentral",
  initialize: function(container) {
    console.log(container);
    decorateCooked(container, function($elem) {
      $elem.scUids()
    });
  }
};


