const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');
// const sharetribeSdk = require('sharetribe-flex-sdk');
const { types } = require("sharetribe-flex-sdk");
const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_ID,
  clientSecret: process.env.SHARETRIBE_INTEGRATIONSDK_CLIENT_SECRET,
});

const { UUID } = types;

integrationSdk.transactions.query().then(res => {
    // res.data contains the response data
  });
  
const methods = { totalBooking: async (req, res) => {
   try {
     
      const result = await integrationSdk.transactions.query().then({
        id:authorId,
      
        
      });  
      
      return res
       
    
    } catch (error) {
      console.error('error', error)
    }
  }
}
module.exports = methods;


