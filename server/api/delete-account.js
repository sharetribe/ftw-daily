const { getSdk, getTrustedSdk, handleError } = require('../api-util/sdk');

// The list of non-final transitions depends on the transaction processes
// being used on the marketplace. This list contains the non-final transitions
// of flex-default-process i.e. the ones where we do not want to allow the user
// to delete their account.
const nonFinalTransitions = [
  'transition/request-payment',
  'transition/request-payment-after-enquiry',
  'transition/confirm-payment',
  'transition/accept',
  'transition/complete',
  'transition/review-1-by-customer',
  'transition/review-1-by-provider',
];

module.exports = (req, res) => {
  const { currentPassword } = req.body;

  const sdk = getSdk(req, res);

  let incompleteTransactions = null;
  let deletable = false;

  sdk.transactions
    .query({ lastTransitions: nonFinalTransitions })
    .then(resp => {
      // Determine whether user has transactions that are in a non-final
      // state.
      incompleteTransactions = resp.data.data;
      deletable = incompleteTransactions.length === 0;
      return getTrustedSdk(req);
    })
    .then(trustedSdk => {
      // If the user has incomplete transactions, send a 409 Conflict response
      // indicating the number of unfinished transactions.
      if (!deletable) {
        sendConflictResponse(incompleteTransactions, res);
        return;
      }

      // You can use this response for client-side testing purposes before actually
      // deleting your users. Uncomment the rows below to call the SDK live.

      res.status(200).send({ status: 200, statusText: 'OK' });

       // If the user has only completed transactions, delete the user
       trustedSdk.currentUser.delete({ currentPassword })
         .then(resp => {
           res
             .status(resp.status)
             .send(resp);
         })
         // If deleting fails, use the built-in handler to pass the error as a response
         .catch(e => handleError(res, e))
    })
    .catch(e => handleError(res, e));
};

// Construct a 409 Conflict response with a message indicating the number of
// incomplete transactions.  If you want, you can also include the full list
// of transactions as 'data' in the response body.
const sendConflictResponse = (incompleteTransactions, res) => {
  const txLabel =
    incompleteTransactions.length === 1 ? 'transaction' : 'transactions';
  const message = `${incompleteTransactions.length} unfinished ${txLabel}.`;

  res.status(409).send({ status: 409, statusText: 'Conflict', message });
};