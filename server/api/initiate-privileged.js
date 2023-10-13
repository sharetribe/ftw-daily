const moment = require('moment');
const { updateTransactionMetaData } = require('./intergation-api');
const { transactionLineItems } = require('../api-util/lineItems');
const { getSdk, getTrustedSdk, handleError, serialize } = require('../api-util/sdk');

module.exports = (req, res) => {
  const { isSpeculative, bookingData, bodyParams, queryParams } = req.body;

  const listingId = bodyParams && bodyParams.params ? bodyParams.params.listingId : null;

  const sdk = getSdk(req, res);
  let lineItems = null;

  sdk.listings
    .show({ id: listingId })
    .then(listingResponse => {
      const listing = listingResponse.data.data;
      lineItems = transactionLineItems(listing, bookingData);

      return getTrustedSdk(req);
    })
    .then(async trustedSdk => {
      const { params } = bodyParams;

      // Add lineItems to the body params
      const body = {
        ...bodyParams,
        params: {
          ...params,
          lineItems,
        },
      };
     
      
      const diffOfDays = moment(bookingData.startDate).diff(moment(), 'days');

      let transaction;
      if (isSpeculative) {
        return trustedSdk.transactions.initiateSpeculative(body, queryParams);
      } else {
        transaction = await trustedSdk.transactions.initiate(body, queryParams);
      }
      transaction = transaction.data.data;
      return updateTransactionMetaData({
        body: {
          id: transaction.id.uuid,
          metadata: {
            acceptedDate: diffOfDays > 2
              ? moment().add(48, 'hours').format("MMM D, YYYY")
              : moment(bookingData.startDate).format("MMM D, YYYY")
          },
          fallBack: true
        }
      });
    })
    .then(apiResponse => {
      const { status, statusText, data } = apiResponse;
      res
        .status(status)
        .set('Content-Type', 'application/transit+json')
        .send(
          serialize({
            status,
            statusText,
            data,
          })
        )
        .end();
    })
    .catch(e => {
      handleError(res, e);
    });
};
