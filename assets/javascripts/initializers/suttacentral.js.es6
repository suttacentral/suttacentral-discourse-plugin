
import { withPluginApi } from 'discourse/lib/plugin-api';


export default {
  name: "suttacentral",
  initialize() {
    
    withPluginApi('0.1', api => {
      
      api.decorateCooked( $elem => $elem.scUids() );
    })
  }
};


