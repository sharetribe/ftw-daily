import { storableError } from '../util/errors';
import * as log from '../util/log';

// ================ Action types ================ //

export const STRIPE_ACCOUNT_CREATE_REQUEST = 'app/stripe/STRIPE_ACCOUNT_CREATE_REQUEST';
export const STRIPE_ACCOUNT_CREATE_SUCCESS = 'app/stripe/STRIPE_ACCOUNT_CREATE_SUCCESS';
export const STRIPE_ACCOUNT_CREATE_ERROR = 'app/stripe/STRIPE_ACCOUNT_CREATE_ERROR';

export const STRIPE_ACCOUNT_UPDATE_REQUEST = 'app/stripe/STRIPE_ACCOUNT_UPDATE_REQUEST';
export const STRIPE_ACCOUNT_UPDATE_SUCCESS = 'app/stripe/STRIPE_ACCOUNT_UPDATE_SUCCESS';
export const STRIPE_ACCOUNT_UPDATE_ERROR = 'app/stripe/STRIPE_ACCOUNT_UPDATE_ERROR';

export const STRIPE_ACCOUNT_CLEAR_ERROR = 'app/stripe/STRIPE_ACCOUNT_CLEAR_ERROR';

export const ACCOUNT_OPENER_CREATE_REQUEST = 'app/stripe/ACCOUNT_OPENER_CREATE_REQUEST';
export const ACCOUNT_OPENER_CREATE_SUCCESS = 'app/stripe/ACCOUNT_OPENER_CREATE_SUCCESS';
export const ACCOUNT_OPENER_CREATE_ERROR = 'app/stripe/ACCOUNT_OPENER_CREATE_ERROR';

export const PERSON_CREATE_REQUEST = 'app/stripe/PERSON_CREATE_REQUEST';
export const PERSON_CREATE_SUCCESS = 'app/stripe/PERSON_CREATE_SUCCESS';
export const PERSON_CREATE_ERROR = 'app/stripe/PERSON_CREATE_ERROR';

export const CLEAR_PAYMENT_TOKEN = 'app/stripe/CLEAR_PAYMENT_TOKEN';

export const HANDLE_CARD_PAYMENT_REQUEST = 'app/stripe/HANDLE_CARD_PAYMENT_REQUEST';
export const HANDLE_CARD_PAYMENT_SUCCESS = 'app/stripe/HANDLE_CARD_PAYMENT_SUCCESS';
export const HANDLE_CARD_PAYMENT_ERROR = 'app/stripe/HANDLE_CARD_PAYMENT_ERROR';

export const HANDLE_CARD_SETUP_REQUEST = 'app/stripe/HANDLE_CARD_SETUP_REQUEST';
export const HANDLE_CARD_SETUP_SUCCESS = 'app/stripe/HANDLE_CARD_SETUP_SUCCESS';
export const HANDLE_CARD_SETUP_ERROR = 'app/stripe/HANDLE_CARD_SETUP_ERROR';

export const CLEAR_HANDLE_CARD_PAYMENT = 'app/stripe/CLEAR_HANDLE_CARD_PAYMENT';

export const RETRIEVE_PAYMENT_INTENT_REQUEST = 'app/stripe/RETRIEVE_PAYMENT_INTENT_REQUEST';
export const RETRIEVE_PAYMENT_INTENT_SUCCESS = 'app/stripe/RETRIEVE_PAYMENT_INTENT_SUCCESS';
export const RETRIEVE_PAYMENT_INTENT_ERROR = 'app/stripe/RETRIEVE_PAYMENT_INTENT_ERROR';

// ================ Reducer ================ //

const initialState = {
  createStripeAccountInProgress: false,
  createStripeAccountError: null,
  updateStripeAccountInProgress: false,
  updateStripeAccountError: null,
  createAccountOpenerInProgress: false,
  createAccountOpenerError: false,
  personAccountOpener: null,
  persons: [],
  stripeAccount: null,
  stripeAccountFetched: false,
  handleCardPaymentInProgress: false,
  handleCardPaymentError: null,
  handleCardSetupInProgress: false,
  handleCardSetupError: null,
  paymentIntent: null,
  setupIntent: null,
  retrievePaymentIntentInProgress: false,
  retrievePaymentIntentError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case STRIPE_ACCOUNT_CREATE_REQUEST:
      return { ...state, createStripeAccountError: null, createStripeAccountInProgress: true };
    case STRIPE_ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        createStripeAccountInProgress: false,
        stripeAccount: payload,
        stripeAccountFetched: true,
      };
    case STRIPE_ACCOUNT_CREATE_ERROR:
      console.error(payload);
      return { ...state, createStripeAccountError: payload, createStripeAccountInProgress: false };

    case STRIPE_ACCOUNT_UPDATE_REQUEST:
      return { ...state, updateStripeAccountError: null, updateStripeAccountInProgress: true };
    case STRIPE_ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        updateStripeAccountInProgress: false,
        stripeAccount: payload,
        stripeAccountFetched: true,
      };
    case STRIPE_ACCOUNT_UPDATE_ERROR:
      console.error(payload);
      return { ...state, updateStripeAccountError: payload, createStripeAccountInProgress: false };

    case STRIPE_ACCOUNT_CLEAR_ERROR:
      return { ...initialState };

    case ACCOUNT_OPENER_CREATE_REQUEST:
      return {
        ...state,
        createAccountOpenerError: null,
        createAccountOpenerInProgress: true,
      };
    case ACCOUNT_OPENER_CREATE_SUCCESS:
      return { ...state, createAccountOpenerInProgress: false, personAccountOpener: payload };
    case ACCOUNT_OPENER_CREATE_ERROR:
      console.error(payload);
      return { ...state, createAccountOpenerError: payload, createAccountOpenerInProgress: false };

    case PERSON_CREATE_REQUEST:
      return {
        ...state,
        persons: [
          ...state.persons,
          {
            ...payload,
            createStripePersonError: null,
            createStripePersonInProgress: true,
          },
        ],
      };
    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        persons: state.persons.map(p => {
          return p.personToken === payload.personToken
            ? { ...payload, createStripePersonInProgress: false }
            : p;
        }),
      };
    case PERSON_CREATE_ERROR:
      console.error(payload);
      return {
        ...state,
        persons: state.persons.map(p => {
          return p.personToken === payload.personToken
            ? { ...p, createStripePersonInProgress: false, createStripePersonError: payload.error }
            : p;
        }),
      };

    case HANDLE_CARD_PAYMENT_REQUEST:
      return {
        ...state,
        handleCardPaymentError: null,
        handleCardPaymentInProgress: true,
      };
    case HANDLE_CARD_PAYMENT_SUCCESS:
      return { ...state, paymentIntent: payload, handleCardPaymentInProgress: false };
    case HANDLE_CARD_PAYMENT_ERROR:
      console.error(payload);
      return { ...state, handleCardPaymentError: payload, handleCardPaymentInProgress: false };

    case HANDLE_CARD_SETUP_REQUEST:
      return {
        ...state,
        handleCardSetupError: null,
        handleCardSetupInProgress: true,
      };
    case HANDLE_CARD_SETUP_SUCCESS:
      return { ...state, setupIntent: payload, handleCardSetupInProgress: false };
    case HANDLE_CARD_SETUP_ERROR:
      console.error(payload);
      return { ...state, handleCardSetupError: payload, handleCardSetupInProgress: false };

    case CLEAR_HANDLE_CARD_PAYMENT:
      return {
        ...state,
        handleCardPaymentInProgress: false,
        handleCardPaymentError: null,
        paymentIntent: null,
      };

    case RETRIEVE_PAYMENT_INTENT_REQUEST:
      return {
        ...state,
        retrievePaymentIntentError: null,
        retrievePaymentIntentInProgress: true,
      };
    case RETRIEVE_PAYMENT_INTENT_SUCCESS:
      return { ...state, paymentIntent: payload, retrievePaymentIntentInProgress: false };
    case RETRIEVE_PAYMENT_INTENT_ERROR:
      console.error(payload);
      return {
        ...state,
        retrievePaymentIntentError: payload,
        retrievePaymentIntentInProgress: false,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const stripeAccountCreateRequest = () => ({ type: STRIPE_ACCOUNT_CREATE_REQUEST });

export const stripeAccountCreateSuccess = stripeAccount => ({
  type: STRIPE_ACCOUNT_CREATE_SUCCESS,
  payload: stripeAccount,
});

export const stripeAccountCreateError = e => ({
  type: STRIPE_ACCOUNT_CREATE_ERROR,
  payload: e,
  error: true,
});

export const stripeAccountUpdateRequest = () => ({ type: STRIPE_ACCOUNT_CREATE_REQUEST });

export const stripeAccountUpdateSuccess = stripeAccount => ({
  type: STRIPE_ACCOUNT_CREATE_SUCCESS,
  payload: stripeAccount,
});

export const stripeAccountUpdateError = e => ({
  type: STRIPE_ACCOUNT_CREATE_ERROR,
  payload: e,
  error: true,
});

export const stripeAccountClearError = () => ({
  type: STRIPE_ACCOUNT_CLEAR_ERROR,
});

export const accountOpenerCreateRequest = personToken => ({
  type: ACCOUNT_OPENER_CREATE_REQUEST,
  payload: personToken,
});

export const accountOpenerCreateSuccess = payload => ({
  type: ACCOUNT_OPENER_CREATE_SUCCESS,
  payload,
});

export const accountOpenerCreateError = payload => ({
  type: ACCOUNT_OPENER_CREATE_ERROR,
  payload,
  error: true,
});

export const personCreateRequest = personToken => ({
  type: PERSON_CREATE_REQUEST,
  payload: personToken,
});

export const personCreateSuccess = payload => ({
  type: PERSON_CREATE_SUCCESS,
  payload,
});

export const personCreateError = payload => ({
  type: PERSON_CREATE_ERROR,
  payload,
  error: true,
});

export const handleCardPaymentRequest = () => ({
  type: HANDLE_CARD_PAYMENT_REQUEST,
});

export const handleCardPaymentSuccess = payload => ({
  type: HANDLE_CARD_PAYMENT_SUCCESS,
  payload,
});

export const handleCardPaymentError = payload => ({
  type: HANDLE_CARD_PAYMENT_ERROR,
  payload,
  error: true,
});

export const handleCardSetupRequest = () => ({
  type: HANDLE_CARD_SETUP_REQUEST,
});

export const handleCardSetupSuccess = payload => ({
  type: HANDLE_CARD_SETUP_SUCCESS,
  payload,
});

export const handleCardSetupError = payload => ({
  type: HANDLE_CARD_SETUP_ERROR,
  payload,
  error: true,
});

export const initializeCardPaymentData = () => ({
  type: CLEAR_HANDLE_CARD_PAYMENT,
});

export const retrievePaymentIntentRequest = () => ({
  type: RETRIEVE_PAYMENT_INTENT_REQUEST,
});

export const retrievePaymentIntentSuccess = payload => ({
  type: RETRIEVE_PAYMENT_INTENT_SUCCESS,
  payload,
});

export const retrievePaymentIntentError = payload => ({
  type: RETRIEVE_PAYMENT_INTENT_ERROR,
  payload,
  error: true,
});

// ================ Thunks ================ //

export const retrievePaymentIntent = params => dispatch => {
  const { stripe, stripePaymentIntentClientSecret } = params;
  dispatch(retrievePaymentIntentRequest());

  return stripe
    .retrievePaymentIntent(stripePaymentIntentClientSecret)
    .then(response => {
      if (response.error) {
        return Promise.reject(response);
      } else {
        dispatch(retrievePaymentIntentSuccess(response.paymentIntent));
        return response;
      }
    })
    .catch(err => {
      // Unwrap Stripe error.
      const e = err.error || storableError(err);
      dispatch(retrievePaymentIntentError(e));

      // Log error
      const { code, doc_url, message, payment_intent } = err.error || {};
      const loggableError = err.error
        ? {
            code,
            message,
            doc_url,
            paymentIntentStatus: payment_intent
              ? payment_intent.status
              : 'no payment_intent included',
          }
        : e;
      log.error(loggableError, 'stripe-retrieve-payment-intent-failed', {
        stripeMessage: loggableError.message,
      });
      throw err;
    });
};

export const handleCardPayment = params => dispatch => {
  // It's required to use the same instance of Stripe as where the card has been created
  // so that's why Stripe needs to be passed here and we can't create a new instance.
  const { stripe, card, paymentParams, stripePaymentIntentClientSecret } = params;
  const transactionId = params.orderId;

  dispatch(handleCardPaymentRequest());

  // When using default payment method, card (aka Stripe Element) is not needed.
  // We also set paymentParams.payment_method already in Flex API side,
  // when request-payment transition is made - so there's no need for paymentParams
  const args = card
    ? [stripePaymentIntentClientSecret, card, paymentParams]
    : [stripePaymentIntentClientSecret];

  return stripe
    .handleCardPayment(...args)
    .then(response => {
      if (response.error) {
        return Promise.reject(response);
      } else {
        dispatch(handleCardPaymentSuccess(response));
        return { ...response, transactionId };
      }
    })
    .catch(err => {
      // Unwrap Stripe error.
      const e = err.error || storableError(err);
      dispatch(handleCardPaymentError(e));

      // Log error
      const containsPaymentIntent = err.error && err.error.payment_intent;
      const { code, doc_url, message, payment_intent } = containsPaymentIntent ? err.error : {};
      const loggableError = containsPaymentIntent
        ? {
            code,
            message,
            doc_url,
            paymentIntentStatus: payment_intent.status,
          }
        : e;
      log.error(loggableError, 'stripe-handle-card-payment-failed', {
        stripeMessage: loggableError.message,
      });
      throw e;
    });
};

export const handleCardSetup = params => dispatch => {
  // It's required to use the same instance of Stripe as where the card has been created
  // so that's why Stripe needs to be passed here and we can't create a new instance.
  const { stripe, card, setupIntentClientSecret, paymentParams } = params;

  dispatch(handleCardSetupRequest());

  return stripe
    .handleCardSetup(setupIntentClientSecret, card, paymentParams)
    .then(response => {
      if (response.error) {
        return Promise.reject(response);
      } else {
        dispatch(handleCardSetupSuccess(response));
        return response;
      }
    })
    .catch(err => {
      // Unwrap Stripe error.
      const e = err.error || storableError(err);
      dispatch(handleCardSetupError(e));

      // Log error
      const containsSetupIntent = err.error && err.error.setup_intent;
      const { code, doc_url, message, setup_intent } = containsSetupIntent ? err.error : {};
      const loggableError = containsSetupIntent
        ? {
            code,
            message,
            doc_url,
            paymentIntentStatus: setup_intent.status,
          }
        : e;
      log.error(loggableError, 'stripe-handle-card-setup-failed', {
        stripeMessage: loggableError.message,
      });
      throw e;
    });
};

// This function is used for updating the bank account token but could be expanded to other information as well. If the Stripe account has been created with account token, you need to use account token also to update the account. By default the account token will not be used.
// See API reference for more information: https://www.sharetribe.com/api-reference/?javascript#update-stripe-account

export const updateStripeAccount = params => (dispatch, getState, sdk) => {
  const bankAccountToken = params.bankAccountToken;

  dispatch(stripeAccountUpdateRequest());
  return sdk.stripeAccount
    .update({ bankAccountToken }, { expand: true })
    .then(response => {
      dispatch(stripeAccountUpdateSuccess(response.data.data));
    })
    .catch(err => {
      const e = storableError(err);
      dispatch(stripeAccountUpdateError(e));
      const stripeMessage =
        e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
          ? e.apiErrors[0].meta.stripeMessage
          : null;
      log.error(err, 'update-stripe-account-failed', { stripeMessage });
      throw e;
    });
};

// TODO: when Create Stripe account API endpoint is updated, check that this function works correctly
export const createStripeAccount = params => (dispatch, getState, sdk) => {
  const country = params.country;
  const bankAccountToken = params.bankAccountToken;

  return sdk.stripeAccount.create({ country, bankAccountToken }, { expand: true }).catch(err => {
    const e = storableError(err);
    dispatch(stripeAccountCreateError(e));
    const stripeMessage =
      e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
        ? e.apiErrors[0].meta.stripeMessage
        : null;
    log.error(err, 'create-stripe-account-failed', { stripeMessage });
    throw e;
  });
};

// ================ Deprecated thunk functions ================ //
// With Stripe Connect Onboarding we don't need to pass account type (individual or business) or other account details to Stripe. Also, Flex API doesn't require account token anymore.

// If you want to handle the whole Stripe onboarding flow in your own application, you can use old PayoutDetailsForm as starting point. The form calls these functions when creating the Stripe account.

// Also note that we might remove this code in the later releases.

// Util: rename address fields to match Stripe API specifications
// const formatAddress = address => {
//   const { city, streetAddress, postalCode, state, province } = address;
//   const cityMaybe = city ? { city } : {};
//   const streetAddressMaybe = streetAddress ? { line1: streetAddress } : {};
//   const postalCodeMaybe = postalCode ? { postal_code: postalCode } : {};
//   const stateMaybe = state ? { state } : province ? { state: province } : {};

//   return {
//     ...cityMaybe,
//     ...streetAddressMaybe,
//     ...postalCodeMaybe,
//     ...stateMaybe,
//   };
// };

// // Util: rename personToken params to match Stripe API specifications
// const personTokenParams = (personData, companyConfig) => {
//   const {
//     isAccountOpener,
//     fname: firstName,
//     lname: lastName,
//     birthDate,
//     address,
//     personalIdNumber,
//     email,
//     phone,
//     role,
//     ownershipPercentage,
//     title,
//   } = personData;

//   const addressMaybe = address ? { address: formatAddress(address) } : {};
//   const emailMaybe = email ? { email } : {};
//   const phoneMaybe = phone ? { phone } : {};

//   const personalIdNumberRequired = companyConfig && companyConfig.personalIdNumberRequired;
//   const ssnLast4Required = companyConfig && companyConfig.ssnLast4Required;

//   const idNumberMaybe = ssnLast4Required
//     ? { ssn_last_4: personalIdNumber }
//     : personalIdNumberRequired
//     ? { id_number: personalIdNumber }
//     : {};

//   const accountOpenerMaybe = isAccountOpener ? { account_opener: true } : {};
//   const jobTitleMaybe = title ? { title } : {};
//   const ownerMaybe = role && role.find(r => r === 'owner') ? { owner: true } : {};
//   const ownershipPercentageMaybe = ownershipPercentage
//     ? { percent_ownership: Number.parseFloat(ownershipPercentage) }
//     : {};

//   const relationshipMaybe =
//     isAccountOpener || title || role
//       ? {
//           relationship: {
//             ...accountOpenerMaybe,
//             ...jobTitleMaybe,
//             ...ownerMaybe,
//             ...ownershipPercentageMaybe,
//           },
//         }
//       : {};

//   return {
//     person: {
//       first_name: firstName,
//       last_name: lastName,
//       dob: birthDate,
//       ...addressMaybe,
//       ...idNumberMaybe,
//       ...emailMaybe,
//       ...phoneMaybe,
//       ...relationshipMaybe,
//     },
//   };
// };

// const createStripePerson = (personParams, companyConfig, stripe) => (dispatch, getState, sdk) => {
//   const { isAccountOpener } = personParams;
//   let personToken = 'no-token';
//   return stripe
//     .createToken('person', personTokenParams(personParams, companyConfig))
//     .then(response => {
//       personToken = response.token.id;

//       // Request to create person in progress
//       // Account opener is mandatory for all - so it's handled separately
//       const createPersonRequest = isAccountOpener
//         ? accountOpenerCreateRequest
//         : personCreateRequest;
//       dispatch(createPersonRequest({ personToken }));

//       return sdk.stripePersons.create({ personToken }, { expand: true });
//     })
//     .then(response => {
//       // Stripe person created successfully
//       const createPersonSuccess = isAccountOpener
//         ? accountOpenerCreateSuccess
//         : personCreateSuccess;
//       dispatch(createPersonSuccess({ personToken, stripePerson: response.data.data }));

//       return response;
//     })
//     .catch(err => {
//       const e = storableError(err);

//       // Stripe person creation failed
//       const createPersonError = isAccountOpener ? accountOpenerCreateError : personCreateError;
//       dispatch(createPersonError({ personToken, error: e }));

//       const stripeMessage =
//         e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
//           ? e.apiErrors[0].meta.stripeMessage
//           : null;
//       log.error(err, 'create-stripe-person-failed', { stripeMessage });
//       throw e;
//     });
// };

// // accountData should be either individual or company
// const bankAccountTokenParams = accountData => accountData.bankAccountToken;
// const businessProfileParams = (accountData, accountConfig) => {
//   const businessProfileRequired =
//     accountConfig && accountConfig.mccForUS && accountConfig.businessURL;

//   const { mcc, url } =
//     accountData && accountData.businessProfile ? accountData.businessProfile : {};

//   const hasInformation = mcc && url;

//   return businessProfileRequired && hasInformation
//     ? {
//         businessProfileMCC: mcc,
//         businessProfileURL: url,
//       }
//     : {};
// };

// // Util: rename accountToken params to match Stripe API specifications
// const accountTokenParamsForCompany = company => {
//   const { address, name, phone, taxId } = company;
//   const addressMaybe = address ? { address: formatAddress(address) } : {};
//   const phoneMaybe = phone ? { phone } : {};
//   return {
//     business_type: 'company',
//     company: {
//       name,
//       tax_id: taxId,
//       ...addressMaybe,
//       ...phoneMaybe,
//     },
//     tos_shown_and_accepted: true,
//   };
// };

// export const createStripeCompanyAccount = (payoutDetails, companyConfig, stripe) => (
//   dispatch,
//   getState,
//   sdk
// ) => {
//   const { company, country, accountOpener, persons = [] } = payoutDetails;
//   const state = getState();
//   let stripeAccount =
//     state.stripe && state.stripe.stripeAccount ? state.stripe.stripeAccount : null;

//   dispatch(stripeAccountCreateRequest());

//   const createPersons = () => {
//     return Promise.all([
//       dispatch(
//         createStripePerson({ ...accountOpener, isAccountOpener: true }, companyConfig, stripe)
//       ),
//       ...persons.map(p => dispatch(createStripePerson(p, companyConfig, stripe))),
//     ]);
//   };

//   // If stripeAccount exists, stripePersons call must have failed.
//   // Retry person creation
//   if (stripeAccount) {
//     return createPersons()
//       .then(response => {
//         // Return created stripe account from this thunk function
//         return stripeAccount;
//       })
//       .catch(err => {
//         const e = storableError(err);
//         dispatch(stripeAccountCreateError(e));
//         const stripeMessage =
//           e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
//             ? e.apiErrors[0].meta.stripeMessage
//             : null;
//         log.error(err, 'create-stripe-company-persons-failed', { stripeMessage });
//         throw e;
//       });
//   }

//   return stripe
//     .createToken('account', accountTokenParamsForCompany(company))
//     .then(response => {
//       const accountToken = response.token.id;
//       const bankAccountToken = bankAccountTokenParams(company);
//       const stripeAccountParams = {
//         accountToken,
//         bankAccountToken,
//         country,
//         ...businessProfileParams(company, companyConfig),
//       };
//       return sdk.stripeAccount.create(stripeAccountParams, { expand: true });
//     })
//     .then(response => {
//       stripeAccount = response;
//       dispatch(stripeAccountCreateSuccess(response.data.data));
//       return createPersons();
//     })
//     .then(response => {
//       // Return created stripe account from this thunk function
//       return stripeAccount;
//     })
//     .catch(err => {
//       const e = storableError(err);
//       dispatch(stripeAccountCreateError(e));
//       const stripeMessage =
//         e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
//           ? e.apiErrors[0].meta.stripeMessage
//           : null;
//       const errorFlag = !stripeAccount
//         ? 'create-stripe-company-account-failed'
//         : 'create-stripe-company-persons-failed';
//       log.error(err, errorFlag, { stripeMessage });
//       throw e;
//     });
// };

// const accountTokenParamsForIndividual = (individual, individualConfig) => {
//   const {
//     fname: firstName,
//     lname: lastName,
//     birthDate,
//     address,
//     phone,
//     email,
//     personalIdNumber,
//   } = individual;

//   const addressMaybe = address ? { address: formatAddress(address) } : {};
//   const dobMaybe = birthDate ? { dob: birthDate } : {};
//   const emailMaybe = email ? { email } : {};
//   const phoneMaybe = phone ? { phone } : {};

//   const personalIdNumberRequired = individualConfig && individualConfig.personalIdNumberRequired;
//   const ssnLast4Required = individualConfig && individualConfig.ssnLast4Required;

//   const idNumberMaybe = ssnLast4Required
//     ? { ssn_last_4: personalIdNumber }
//     : personalIdNumberRequired
//     ? { id_number: personalIdNumber }
//     : {};

//   return {
//     business_type: 'individual',
//     individual: {
//       first_name: firstName,
//       last_name: lastName,
//       ...dobMaybe,
//       ...addressMaybe,
//       ...emailMaybe,
//       ...phoneMaybe,
//       ...idNumberMaybe,
//     },
//     tos_shown_and_accepted: true,
//   };
// };

// export const createStripeIndividualAccount = (payoutDetails, individualConfig, stripe) => (
//   dispatch,
//   getState,
//   sdk
// ) => {
//   const { country, individual } = payoutDetails;
//   let stripeAccount;
//   dispatch(stripeAccountCreateRequest());

//   return stripe
//     .createToken('account', accountTokenParamsForIndividual(individual, individualConfig))
//     .then(response => {
//       const accountToken = response.token.id;
//       const bankAccountToken = bankAccountTokenParams(individual);
//       const stripeAccountParams = {
//         accountToken,
//         bankAccountToken,
//         country,
//         ...businessProfileParams(individual, individualConfig),
//       };
//       return sdk.stripeAccount.create(stripeAccountParams, { expand: true });
//     })
//     .then(response => {
//       stripeAccount = response;
//       dispatch(stripeAccountCreateSuccess(response.data.data));
//       return stripeAccount;
//     })
//     .catch(err => {
//       const e = storableError(err);
//       dispatch(stripeAccountCreateError(e));
//       const stripeMessage =
//         e.apiErrors && e.apiErrors.length > 0 && e.apiErrors[0].meta
//           ? e.apiErrors[0].meta.stripeMessage
//           : null;
//       log.error(err, 'create-stripe-individual-account-failed', { stripeMessage });
//       throw e;
//     });
// };

// export const createStripeAccountWithToken = payoutDetails => (dispatch, getState, sdk) => {
//   if (typeof window === 'undefined' || !window.Stripe) {
//     throw new Error('Stripe must be loaded for submitting PayoutPreferences');
//   }

//   const stripe = window.Stripe(config.stripe.publishableKey);

//   const country = payoutDetails.country;
//   const countryConfig = config.stripe.supportedCountries.find(c => c.code === country);
//   const individualConfig = countryConfig.individualConfig;
//   const companyConfig = countryConfig.companyConfig;

//   if (payoutDetails.accountType === 'individual') {
//     return dispatch(createStripeIndividualAccount(payoutDetails, individualConfig, stripe));
//   } else {
//     return dispatch(createStripeCompanyAccount(payoutDetails, companyConfig, stripe));
//   }
// };

// ================ Deprecated thunk functions above ================ //
