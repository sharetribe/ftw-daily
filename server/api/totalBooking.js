
// const sharetribeSdk = require('sharetribe-flex-sdk');
// // const sharetribeSdk = require('sharetribe-flex-sdk');
// const { types } = require("sharetribe-flex-sdk");
// const integrationSdk = sharetribeSdk.createInstance({
//    clientId: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_ID,
// clientSecret: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_SECRET,
// //   const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
// // const CLIENT_SECRET = process.env.SHARETRIBE_SDK_CLIENT_SECRET;
// });


const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');

const {UUID}= sharetribeIntegrationSdk.types;
// const sharetribeSdk = require('sharetribe-flex-sdk');

const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_ID,
  clientSecret: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_SECRET,
});



  
const methods = { 
    fetchTotalBooking: async (req, res) => {
   try {
    const  {listingId} = req.body; 
   // console.log('listingId', listingId)
    const apiQueryParams = {
        id:new UUID(listingId.uuid),
        include: ['provider', 'provider.profileImage', 'customer', 'customer.profileImage', 'booking','listing'],
        'fields.transaction': [
          'lastTransition',
          'lastTransitionedAt',
          'transitions',
          'payinTotal',
          'payoutTotal',
        ],
        'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
        'fields.image': ['variants.square-small', 'variants.square-small2x'],
      };
      const result = await integrationSdk.transactions.query(apiQueryParams) 
      
      //console.log('result', result.data.data) 
      return res
        .status(200)
        .send({result })
        .end();
    
    } catch (error) {
      console.error('error', error)
    }
  }
}
module.exports = methods;


