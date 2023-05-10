
const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');

const {UUID}= sharetribeIntegrationSdk.types;
const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_ID,
  clientSecret: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_SECRET,
});

  
const methods = { 
    fetchTotalBooking: async (req, res) => {
   try {
    const  {listingId} = req.body; 
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


