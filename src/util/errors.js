/**
 * ================ API error handling utilities ================
 *
 * This module exports helpers that can be used to check if API
 * response errors are some specific error cases.
 *
 * NOTE: most of the functions are tied to an endpoint, and should not
 * be used to check error responses from any other endpoint. Check the
 * name and the docstring of the function to ensure correct usage.
 */

const ERROR_CODE_TRANSITION_PARAMETER_VALIDATION_FAILED = 'transition-parameter-validation-failed';
const ERROR_CODE_PAYMENT_FAILED = 'transaction-payment-failed';
const ERROR_CODE_EMAIL_TAKEN = 'email-taken';
const ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS = 'email-too-many-verification-requests';
const ERROR_CODE_UPLOAD_OVER_LIMIT = 'request-upload-over-limit';

const responseErrors = apiError => {
  return apiError && apiError.data && apiError.data.errors ? apiError.data.errors : [];
};

const hasErrorWithCode = (apiError, code) => {
  return responseErrors(apiError).some(error => {
    return error.code === code;
  });
};

/**
 * Check if the given API error (from `sdk.currentuser.create()`) is
 * due to the email address already being in use.
 */
export const isSignupEmailTakenError = error => hasErrorWithCode(error, ERROR_CODE_EMAIL_TAKEN);

/**
 * Check if the given API error (from `sdk.currentuser.changeEmail()`) is
 * due to the email address already being in use.
 */
export const isChangeEmailTakenError = error => hasErrorWithCode(error, ERROR_CODE_EMAIL_TAKEN);

/**
 * Check if the given API error (from
 * `sdk.currentUser.sendVerificationEmail()`) is due to too many
 * active email verification requests.
 *
 * There qre only a specific amount of active verification requests
 * allowed, and the user has to wait for them to expire to be able to
 * request sending new verification emails.
 */
export const isTooManyEmailVerificationRequestsError = error =>
  hasErrorWithCode(error, ERROR_CODE_TOO_MANY_VERIFICATION_REQUESTS);

/**
 * Check if the given API error (from
 * `sdk.images.uploadListingImage()`) is due to the image being over
 * the size limit.
 */
export const isUploadListingImageOverLimitError = error =>
  hasErrorWithCode(error, ERROR_CODE_UPLOAD_OVER_LIMIT);

/**
 * Check if the given API error (from
 * `sdk.images.uploadProfileImage()`) is due to the image being over
 * the size limit.
 */
export const isUploadProfileImageOverLimitError = error =>
  hasErrorWithCode(error, ERROR_CODE_UPLOAD_OVER_LIMIT);

/**
 * Check if the given API error (from `sdk.passwordReset.request()`)
 * is due to no user having the given email address.
 */
export const isPasswordRecoveryEmailNotFoundError = error => error && error.status === 404;

/**
 * Check if the given API error (from `sdk.passwordReset.request()`)
 * is due to the email not being verified, preventing the reset.
 */
export const isPasswordRecoveryEmailNotVerifiedError = error => error && error.status === 409;

/**
 * Check if the given API error (from `sdk.transaction.initiate()` or
 * `sdk.transaction.initiateSpeculative()`) is due to the listing
 * being closed or deleted.
 */
export const isTransactionInitiateListingNotFoundError = error => {
  return responseErrors(error).some(apiError => {
    let notfound = false;

    try {
      // TODO: This is clearly a temporary solution for digging out
      // the deleted information from the error and should be changed
      // to a proper error code when the API supports a specific code
      // for this.
      notfound = apiError.details.data.rep[0][1].reason === 'listing-not-found';
    } catch (e) {
      // Ignore
    }

    return apiError.code === ERROR_CODE_TRANSITION_PARAMETER_VALIDATION_FAILED && notfound;
  });
};

/**
 * Check if the given API error (from `sdk.transaction.initiate()`) is
 * due to the transaction total amount being too low for Stripe.
 */
export const isTransactionInitiateAmountTooLowError = error => {
  return responseErrors(error).some(apiError => {
    const isPaymentFailedError =
      apiError.status === 402 && apiError.code === ERROR_CODE_PAYMENT_FAILED;
    let isAmountTooLow = false;

    try {
      // TODO: This is a temporary solution until a proper error code
      // for this specific error is received in the response.
      const msg = apiError.details.msg;
      isAmountTooLow = msg.startsWith('Amount must be at least');
    } catch (e) {
      // Ignore
    }

    return isPaymentFailedError && isAmountTooLow;
  });
};

/**
 * Check if the given API error (from `sdk.currentUser.changeEmail(params)`)
 * is due to giving wrong password.
 */
export const isChangeEmailWrongPassword = error => error && error.status === 403;

/**
 * Check if the given API error (from `sdk.currentUser.changePassword(params)`)
 * is due to giving wrong password.
 */
export const isChangePasswordWrongPassword = error => error && error.status === 403;
