
import { withPluginApi } from 'discourse/lib/plugin-api';


export default {
  name: "suttacentral",
  initialize() {
    
    withPluginApi('0.4', api => {
      try {
        api.decorateCooked( elem => $(elem).scUids() );
      } catch (err) {
        console.log('An error occured when attempting to add sc uids markup ', err);
      }
    })
  }
};


